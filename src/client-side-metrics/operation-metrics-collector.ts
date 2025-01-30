// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as fs from 'fs';
import {IMetricsHandler} from './metrics-handler';
import {
  AttemptOnlyAttributes,
  MethodName,
  OnAttemptCompleteInfo,
  OnOperationCompleteAttributes,
  OperationOnlyAttributes,
} from '../../common/client-side-metrics-attributes';

/**
 * An interface representing a Date-like object.  Provides a `getTime` method
 * for retrieving the time value in milliseconds.  Used for abstracting time
 * in tests.
 */
interface DateLike {
  /**
   * Returns the time value in milliseconds.
   * @returns The time value in milliseconds.
   */
  getTime(): number;
}

/**
 * Interface for a provider that returns DateLike objects. Used for mocking dates in tests.
 */
export interface DateProvider {
  /**
   * Returns a DateLike object.
   * @returns A DateLike object representing the current time or a fake time value.
   */
  getDate(): DateLike;
}

/**
 * The default DateProvider implementation.  Returns the current date and time.
 */
export class DefaultDateProvider {
  /**
   * Returns a new Date object representing the current time.
   * @returns {Date} The current date and time.
   */
  getDate() {
    return new Date();
  }
}

/**
 * An interface representing a tabular API surface, such as a Bigtable table.
 */
export interface ITabularApiSurface {
  instance: {
    id: string;
  };
  id: string;
  bigtable: {
    appProfileId?: string;
  };
}

const packageJSON = fs.readFileSync('package.json');
const version = JSON.parse(packageJSON.toString()).version;

// MetricsCollectorState is a list of states that the metrics collector can be in.
// Tracking the OperationMetricsCollector state is done so that the
// OperationMetricsCollector methods are not called in the wrong order. If the
// methods are called in the wrong order they will not execute and they will
// throw warnings.
//
// The following state transitions are allowed:
// OPERATION_NOT_STARTED -> OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS
// OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS -> OPERATION_STARTED_ATTEMPT_IN_PROGRESS
// OPERATION_STARTED_ATTEMPT_IN_PROGRESS -> OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS
// OPERATION_STARTED_ATTEMPT_IN_PROGRESS -> OPERATION_COMPLETE
enum MetricsCollectorState {
  OPERATION_NOT_STARTED,
  OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS,
  OPERATION_STARTED_ATTEMPT_IN_PROGRESS,
  OPERATION_COMPLETE,
}

/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
export class OperationMetricsCollector {
  private state: MetricsCollectorState;
  private operationStartTime: DateLike | null;
  private attemptStartTime: DateLike | null;
  private zone: string | undefined;
  private cluster: string | undefined;
  private tabularApiSurface: ITabularApiSurface;
  private methodName: MethodName;
  private projectId?: string;
  private attemptCount = 0;
  private receivedFirstResponse: boolean;
  private metricsHandlers: IMetricsHandler[];
  private firstResponseLatency: number | null;
  private serverTimeRead: boolean;
  private serverTime: number | null;
  private dateProvider: DateProvider;
  private connectivityErrorCount = 0;

  /**
   * @param {ITabularApiSurface} tabularApiSurface Information about the Bigtable table being accessed.
   * @param {IMetricsHandler[]} metricsHandlers The metrics handlers used for recording metrics.
   * @param {MethodName} methodName The name of the method being traced.
   * @param {string} projectId The id of the project.
   * @param {DateProvider} dateProvider A provider for date/time information (for testing).
   */
  constructor(
    tabularApiSurface: ITabularApiSurface,
    metricsHandlers: IMetricsHandler[],
    methodName: MethodName,
    projectId?: string,
    dateProvider?: DateProvider
  ) {
    this.state = MetricsCollectorState.OPERATION_NOT_STARTED;
    this.zone = undefined;
    this.cluster = undefined;
    this.tabularApiSurface = tabularApiSurface;
    this.methodName = methodName;
    this.operationStartTime = null;
    this.attemptStartTime = null;
    this.receivedFirstResponse = false;
    this.metricsHandlers = metricsHandlers;
    this.firstResponseLatency = null;
    this.serverTimeRead = false;
    this.serverTime = null;
    this.projectId = projectId;
    if (dateProvider) {
      this.dateProvider = dateProvider;
    } else {
      this.dateProvider = new DefaultDateProvider();
    }
  }

  /**
   * Assembles the basic attributes for metrics. These attributes provide
   * context about the Bigtable environment and the operation being performed.
   * @param {string} projectId The Google Cloud project ID.
   * @returns {Attributes} An object containing the basic attributes.
   */
  private getBasicAttributes(projectId: string) {
    return {
      projectId,
      instanceId: this.tabularApiSurface.instance.id,
      table: this.tabularApiSurface.id,
      cluster: this.cluster,
      zone: this.zone,
      appProfileId: this.tabularApiSurface.bigtable.appProfileId,
      methodName: this.methodName,
      clientName: `nodejs-bigtable/${version}`,
    };
  }

  /**
   * Assembles the attributes for an entire operation.  These attributes
   * provide context about the Bigtable environment, the operation being
   * performed, and the final status of the operation. Includes whether the
   * operation was a streaming operation or not.
   *
   * @param {string} projectId The Google Cloud project ID.
   * @param {OperationOnlyAttributes} operationOnlyAttributes The attributes of the operation.
   * @returns {OnOperationCompleteAttributes} An object containing the attributes
   * for operation latency metrics.
   */
  private getOperationAttributes(
    projectId: string,
    operationOnlyAttributes: OperationOnlyAttributes
  ): OnOperationCompleteAttributes {
    return Object.assign(
      operationOnlyAttributes,
      this.getBasicAttributes(projectId)
    );
  }

  /**
   * Assembles the attributes for attempt metrics. These attributes provide context
   * about the Bigtable environment, the operation being performed, the status
   * of the attempt and whether the operation was a streaming operation or not.
   *
   * @param {string} projectId The Google Cloud project ID.
   * @param {AttemptOnlyAttributes} attemptOnlyAttributes The attributes of the attempt.
   * @returns {OnAttemptCompleteAttributes} The attributes all metrics recorded
   * in the onAttemptComplete handler.
   */
  private getAttemptAttributes(
    projectId: string,
    attemptOnlyAttributes: AttemptOnlyAttributes
  ) {
    return Object.assign(
      attemptOnlyAttributes,
      this.getBasicAttributes(projectId)
    );
  }

  /**
   * Called when the operation starts. Records the start time.
   */
  onOperationStart() {
    if (this.state === MetricsCollectorState.OPERATION_NOT_STARTED) {
      this.operationStartTime = this.dateProvider.getDate();
      this.firstResponseLatency = null;
      this.receivedFirstResponse = false;
      this.state =
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS;
    } else {
      console.warn('Invalid state transition');
    }
  }

  /**
   * Called when an attempt (e.g., an RPC attempt) completes. Records attempt latencies.
   * @param {OnAttemptCompleteInfo} info Information about the completed attempt.
   */
  onAttemptComplete(info: OnAttemptCompleteInfo) {
    if (
      this.state === MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS
    ) {
      this.state =
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS;
      this.attemptCount++;
      const endTime = this.dateProvider.getDate();
      const projectId = this.projectId;
      if (projectId && this.attemptStartTime) {
        const attributes = this.getAttemptAttributes(projectId, info);
        const totalTime = endTime.getTime() - this.attemptStartTime.getTime();
        this.metricsHandlers.forEach(metricsHandler => {
          if (metricsHandler.onAttemptComplete) {
            metricsHandler.onAttemptComplete(
              {
                attemptLatency: totalTime,
                serverLatency: this.serverTime ?? undefined,
                connectivityErrorCount: this.connectivityErrorCount,
              },
              attributes
            );
          }
        });
      }
    } else {
      console.warn('Invalid state transition attempted');
    }
  }

  /**
   * Called when a new attempt starts. Records the start time of the attempt.
   */
  onAttemptStart() {
    if (
      this.state ===
      MetricsCollectorState.OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS
    ) {
      this.state = MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS;
      this.attemptStartTime = this.dateProvider.getDate();
      this.serverTime = null;
      this.serverTimeRead = false;
      this.connectivityErrorCount = 0;
    } else {
      console.warn('Invalid state transition attempted');
    }
  }

  /**
   * Called when the first response is received. Records first response latencies.
   */
  onResponse() {
    const endTime = this.dateProvider.getDate();
    const projectId = this.projectId;
    if (projectId && this.operationStartTime) {
      const totalTime = endTime.getTime() - this.operationStartTime.getTime();
      if (!this.receivedFirstResponse) {
        this.receivedFirstResponse = true;
        this.firstResponseLatency = totalTime;
      }
    }
  }

  /**
   * Called when an operation completes (successfully or unsuccessfully).
   * Records operation latencies, retry counts, and connectivity error counts.
   * @param {OperationOnlyAttributes} info Information about the completed operation.
   */
  onOperationComplete(info: OperationOnlyAttributes) {
    if (
      this.state ===
      MetricsCollectorState.OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS
    ) {
      this.state = MetricsCollectorState.OPERATION_COMPLETE;
      const endTime = this.dateProvider.getDate();
      const projectId = this.projectId;
      if (projectId && this.operationStartTime) {
        const totalTime = endTime.getTime() - this.operationStartTime.getTime();
        {
          // This block records operation latency metrics.
          const operationLatencyAttributes = this.getOperationAttributes(
            projectId,
            info
          );
          const metrics = {
            operationLatency: totalTime,
            retryCount: this.attemptCount - 1,
            firstResponseLatency: this.firstResponseLatency ?? undefined,
          };
          this.metricsHandlers.forEach(metricsHandler => {
            if (metricsHandler.onOperationComplete) {
              metricsHandler.onOperationComplete(
                metrics,
                operationLatencyAttributes
              );
            }
          });
        }
      }
    } else {
      console.warn('Invalid state transition attempted');
    }
  }

  /**
   * Called when metadata is received. Extracts server timing information if available.
   * @param {object} metadata The received metadata.
   */
  onMetadataReceived(metadata: {
    internalRepr: Map<string, Buffer>;
    options: {};
  }) {
    const mappedEntries = new Map(
      Array.from(metadata.internalRepr.entries(), ([key, value]) => [
        key,
        value.toString(),
      ])
    );
    const durationValues = mappedEntries.get('server-timing')?.split('dur=');
    if (durationValues && durationValues[1]) {
      if (!this.serverTimeRead) {
        this.serverTimeRead = true;
        const serverTime = parseInt(durationValues[1]);
        const projectId = this.projectId;
        if (projectId) {
          this.serverTime = serverTime;
        }
      }
    } else {
      // TODO: Handle directPath traffic
      this.connectivityErrorCount++;
    }
  }

  /**
   * Called when status information is received. Extracts zone and cluster information.
   * @param {object} status The received status information.
   */
  onStatusReceived(status: {
    metadata: {internalRepr: Map<string, Buffer>; options: {}};
  }) {
    const mappedEntries = new Map(
      Array.from(status.metadata.internalRepr.entries(), ([key, value]) => [
        key,
        value.toString(),
      ])
    );
    const instanceInformation = mappedEntries
      .get('x-goog-ext-425905942-bin')
      ?.replace(new RegExp('\\n', 'g'), '')
      .split('\r');
    if (instanceInformation && instanceInformation[0]) {
      this.zone = instanceInformation[0];
    }
    if (instanceInformation && instanceInformation[1]) {
      this.cluster = instanceInformation[1];
    }
  }
}
