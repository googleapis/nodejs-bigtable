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
import {MethodName, StreamingState} from './client-side-metrics-attributes';
import {grpc} from 'google-gax';
import * as gax from 'google-gax';
const root = gax.protobuf.loadSync(
  './protos/google/bigtable/v2/response_params.proto'
);
const ResponseParams = root.lookupType('ResponseParams');

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
    clientUid: string;
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
  OPERATION_STARTED_ATTEMPT_IN_PROGRESS_NO_ROWS_YET,
  OPERATION_STARTED_ATTEMPT_IN_PROGRESS_SOME_ROWS_RECEIVED,
  OPERATION_COMPLETE,
}

/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
export class OperationMetricsCollector {
  private state: MetricsCollectorState;
  private operationStartTime: Date | null;
  private attemptStartTime: Date | null;
  private zone: string | undefined;
  private cluster: string | undefined;
  private tabularApiSurface: ITabularApiSurface;
  private methodName: MethodName;
  private attemptCount = 0;
  private metricsHandlers: IMetricsHandler[];
  private firstResponseLatency: number | null;
  private serverTimeRead: boolean;
  private serverTime: number | null;
  private connectivityErrorCount: number;
  private streamingOperation: StreamingState;

  /**
   * @param {ITabularApiSurface} tabularApiSurface Information about the Bigtable table being accessed.
   * @param {IMetricsHandler[]} metricsHandlers The metrics handlers used for recording metrics.
   * @param {MethodName} methodName The name of the method being traced.
   * @param {StreamingState} streamingOperation Whether or not the call is a streaming operation.
   */
  constructor(
    tabularApiSurface: ITabularApiSurface,
    metricsHandlers: IMetricsHandler[],
    methodName: MethodName,
    streamingOperation: StreamingState
  ) {
    this.state = MetricsCollectorState.OPERATION_NOT_STARTED;
    this.zone = undefined;
    this.cluster = undefined;
    this.tabularApiSurface = tabularApiSurface;
    this.methodName = methodName;
    this.operationStartTime = null;
    this.attemptStartTime = null;
    this.metricsHandlers = metricsHandlers;
    this.firstResponseLatency = null;
    this.serverTimeRead = false;
    this.serverTime = null;
    this.connectivityErrorCount = 0;
    this.streamingOperation = streamingOperation;
  }

  private getMetricsCollectorData() {
    return {
      instanceId: this.tabularApiSurface.instance.id,
      table: this.tabularApiSurface.id,
      cluster: this.cluster,
      zone: this.zone,
      appProfileId: this.tabularApiSurface.bigtable.appProfileId,
      methodName: this.methodName,
      clientUid: this.tabularApiSurface.bigtable.clientUid,
    };
  }

  /**
   * Called when the operation starts. Records the start time.
   */
  onOperationStart() {
    if (this.state === MetricsCollectorState.OPERATION_NOT_STARTED) {
      this.operationStartTime = new Date();
      this.firstResponseLatency = null;
      this.state =
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS;
    } else {
      console.warn('Invalid state transition');
    }
  }

  /**
   * Called when an attempt (e.g., an RPC attempt) completes. Records attempt latencies.
   * @param {string} projectId The id of the project.
   * @param {grpc.status} attemptStatus The grpc status for the attempt.
   */
  onAttemptComplete(projectId: string, attemptStatus: grpc.status) {
    if (
      this.state ===
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS_NO_ROWS_YET ||
      this.state ===
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS_SOME_ROWS_RECEIVED
    ) {
      this.state =
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS;
      this.attemptCount++;
      const endTime = new Date();
      if (projectId && this.attemptStartTime) {
        const totalTime = endTime.getTime() - this.attemptStartTime.getTime();
        this.metricsHandlers.forEach(metricsHandler => {
          if (metricsHandler.onAttemptComplete) {
            metricsHandler.onAttemptComplete({
              attemptLatency: totalTime,
              serverLatency: this.serverTime ?? undefined,
              connectivityErrorCount: this.connectivityErrorCount,
              streamingOperation: this.streamingOperation,
              attemptStatus,
              clientName: `nodejs-bigtable/${version}`,
              metricsCollectorData: this.getMetricsCollectorData(),
              projectId,
            });
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
      this.state =
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS_NO_ROWS_YET;
      this.attemptStartTime = new Date();
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
  onResponse(projectId: string) {
    if (
      this.state ===
      MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS_NO_ROWS_YET
    ) {
      this.state =
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS_SOME_ROWS_RECEIVED;
      const endTime = new Date();
      if (projectId && this.operationStartTime) {
        this.firstResponseLatency =
          endTime.getTime() - this.operationStartTime.getTime();
      }
    }
  }

  /**
   * Called when an operation completes (successfully or unsuccessfully).
   * Records operation latencies, retry counts, and connectivity error counts.
   * @param {string} projectId The id of the project.
   * @param {grpc.status} finalOperationStatus Information about the completed operation.
   */
  onOperationComplete(projectId: string, finalOperationStatus: grpc.status) {
    if (
      this.state ===
      MetricsCollectorState.OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS
    ) {
      this.state = MetricsCollectorState.OPERATION_COMPLETE;
      const endTime = new Date();
      if (projectId && this.operationStartTime) {
        const totalTime = endTime.getTime() - this.operationStartTime.getTime();
        {
          this.metricsHandlers.forEach(metricsHandler => {
            if (metricsHandler.onOperationComplete) {
              metricsHandler.onOperationComplete({
                finalOperationStatus: finalOperationStatus,
                streamingOperation: this.streamingOperation,
                metricsCollectorData: this.getMetricsCollectorData(),
                clientName: `nodejs-bigtable/${version}`,
                projectId,
                operationLatency: totalTime,
                retryCount: this.attemptCount - 1,
                firstResponseLatency: this.firstResponseLatency ?? undefined,
              });
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
    internalRepr: Map<string, string[]>;
    options: {};
  }) {
    const mappedEntries = new Map(
      Array.from(metadata.internalRepr.entries(), ([key, value]) => [
        key,
        value.toString(),
      ])
    );
    const SERVER_TIMING_REGEX = /.*gfet4t7;\s*dur=(\d+\.?\d*).*/;
    const SERVER_TIMING_KEY = 'server-timing';
    const durationValues = mappedEntries.get(SERVER_TIMING_KEY);
    const matchedDuration = durationValues?.match(SERVER_TIMING_REGEX);
    if (matchedDuration && matchedDuration[1]) {
      if (!this.serverTimeRead) {
        this.serverTimeRead = true;
        this.serverTime = isNaN(parseInt(matchedDuration[1]))
          ? null
          : parseInt(matchedDuration[1]);
      }
    } else {
      this.connectivityErrorCount++;
    }
  }

  /**
   * Called when status information is received. Extracts zone and cluster information.
   * @param {object} status The received status information.
   */
  onStatusMetadataReceived(status: {
    metadata: {internalRepr: Map<string, Uint8Array[]>; options: {}};
  }) {
    const INSTANCE_INFORMATION_KEY = 'x-goog-ext-425905942-bin';
    const mappedValue = status.metadata.internalRepr.get(
      INSTANCE_INFORMATION_KEY
    ) as Buffer[];
    const decodedValue = ResponseParams.decode(
      mappedValue[0],
      mappedValue[0].length
    );
    if (decodedValue && (decodedValue as unknown as {zoneId: string}).zoneId) {
      this.zone = (decodedValue as unknown as {zoneId: string}).zoneId;
    }
    if (
      decodedValue &&
      (decodedValue as unknown as {clusterId: string}).clusterId
    ) {
      this.cluster = (decodedValue as unknown as {clusterId: string}).clusterId;
    }
  }
}
