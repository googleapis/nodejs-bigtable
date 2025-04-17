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
  './protos/google/bigtable/v2/response_params.proto',
);
const ResponseParams = root.lookupType('ResponseParams');
const {hrtime} = require('node:process');

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
  private operationStartTime: bigint | null;
  private attemptStartTime: bigint | null;
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
  private applicationLatencies: number[];
  private lastRowReceivedTime: bigint | null;

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
    streamingOperation: StreamingState,
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
    this.lastRowReceivedTime = null;
    this.applicationLatencies = [];
  }

  private getMetricsCollectorData() {
    const appProfileId = this.tabularApiSurface.bigtable.appProfileId;
    return Object.assign(
      {
        instanceId: this.tabularApiSurface.instance.id,
        table: this.tabularApiSurface.id,
        cluster: this.cluster,
        zone: this.zone,
        method: this.methodName,
        client_uid: this.tabularApiSurface.bigtable.clientUid,
      },
      appProfileId ? {app_profile: appProfileId} : {},
    );
  }

  /**
   * Called when the operation starts. Records the start time.
   */
  onOperationStart() {
    if (this.state === MetricsCollectorState.OPERATION_NOT_STARTED) {
      this.operationStartTime = hrtime.bigint();
      this.firstResponseLatency = null;
      this.applicationLatencies = [];
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
      const endTime = hrtime.bigint();
      if (projectId && this.attemptStartTime) {
        const totalMilliseconds = Number(
          (endTime - this.attemptStartTime) / BigInt(1000000),
        );
        this.metricsHandlers.forEach(metricsHandler => {
          if (metricsHandler.onAttemptComplete) {
            metricsHandler.onAttemptComplete({
              attemptLatency: totalMilliseconds,
              serverLatency: this.serverTime ?? undefined,
              connectivityErrorCount: this.connectivityErrorCount,
              streaming: this.streamingOperation,
              status: attemptStatus.toString(),
              client_name: `nodejs-bigtable/${version}`,
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
      this.attemptStartTime = hrtime.bigint();
      this.serverTime = null;
      this.serverTimeRead = false;
      this.connectivityErrorCount = 0;
      this.lastRowReceivedTime = null;
    } else {
      console.warn('Invalid state transition attempted');
    }
  }

  /**
   * Called when the first response is received. Records first response latencies.
   */
  onResponse(projectId: string) {
    if (!this.firstResponseLatency) {
      // Check firstResponseLatency first to improve latency for calls with many rows
      if (
        this.state ===
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS_NO_ROWS_YET
      ) {
        this.state =
          MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS_SOME_ROWS_RECEIVED;
        const endTime = hrtime.bigint();
        if (projectId && this.operationStartTime) {
          // first response latency is measured in total milliseconds.
          this.firstResponseLatency = Number(
            (endTime - this.operationStartTime) / BigInt(1000000),
          );
        }
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
      const endTime = hrtime.bigint();
      if (projectId && this.operationStartTime) {
        const totalMilliseconds = Number(
          (endTime - this.operationStartTime) / BigInt(1000000),
        );
        {
          this.metricsHandlers.forEach(metricsHandler => {
            if (metricsHandler.onOperationComplete) {
              metricsHandler.onOperationComplete({
                status: finalOperationStatus.toString(),
                streaming: this.streamingOperation,
                metricsCollectorData: this.getMetricsCollectorData(),
                client_name: `nodejs-bigtable/${version}`,
                projectId,
                operationLatency: totalMilliseconds,
                retryCount: this.attemptCount - 1,
                firstResponseLatency: this.firstResponseLatency ?? undefined,
                applicationLatencies: this.applicationLatencies,
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
    if (!this.serverTimeRead && this.connectivityErrorCount < 1) {
      // Check serverTimeRead, connectivityErrorCount here to reduce latency.
      const mappedEntries = new Map(
        Array.from(metadata.internalRepr.entries(), ([key, value]) => [
          key,
          value.toString(),
        ]),
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
        this.connectivityErrorCount = 1;
      }
    }
  }

  /**
   * Called when a row from the Bigtable stream reaches the application user.
   *
   * This method is used to calculate the latency experienced by the application
   * when reading rows from a Bigtable stream. It records the time between the
   * previous row being received and the current row reaching the user. These
   * latencies are then collected and reported as `applicationBlockingLatencies`
   * when the operation completes.
   */
  onRowReachesUser() {
    if (
      this.state ===
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS_NO_ROWS_YET ||
      this.state ===
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_IN_PROGRESS_SOME_ROWS_RECEIVED ||
      this.state ===
        MetricsCollectorState.OPERATION_STARTED_ATTEMPT_NOT_IN_PROGRESS
    ) {
      const currentTime = hrtime.bigint();
      if (this.lastRowReceivedTime) {
        // application latency is measured in total milliseconds.
        const applicationLatency = Number(
          (currentTime - this.lastRowReceivedTime) / BigInt(1000000),
        );
        this.applicationLatencies.push(applicationLatency);
      }
      this.lastRowReceivedTime = currentTime;
    } else {
      console.warn('Invalid state transition attempted');
    }
  }

  /**
   * Called when status information is received. Extracts zone and cluster information.
   * @param {object} status The received status information.
   */
  onStatusMetadataReceived(status: {
    metadata: {internalRepr: Map<string, Uint8Array[]>; options: {}};
  }) {
    if (!this.zone || !this.cluster) {
      const INSTANCE_INFORMATION_KEY = 'x-goog-ext-425905942-bin';
      const mappedValue = status.metadata.internalRepr.get(
        INSTANCE_INFORMATION_KEY,
      ) as Buffer[];
      const decodedValue = ResponseParams.decode(
        mappedValue[0],
        mappedValue[0].length,
      );
      if (
        decodedValue &&
        (decodedValue as unknown as {zoneId: string}).zoneId
      ) {
        this.zone = (decodedValue as unknown as {zoneId: string}).zoneId;
      }
      if (
        decodedValue &&
        (decodedValue as unknown as {clusterId: string}).clusterId
      ) {
        this.cluster = (
          decodedValue as unknown as {clusterId: string}
        ).clusterId;
      }
    }
  }
}
