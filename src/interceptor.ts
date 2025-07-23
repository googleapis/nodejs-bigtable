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

import {CallOptions} from 'google-gax';
import {OperationMetricsCollector} from './client-side-metrics/operation-metrics-collector';

// Mock Server Implementation
import * as grpcJs from '@grpc/grpc-js';
import {status as GrpcStatus} from '@grpc/grpc-js';

export type ServerStatus = {
  metadata: {internalRepr: Map<string, Uint8Array[]>; options: {}};
  code: number;
  details: string;
};

// Helper to create interceptor provider for OperationMetricsCollector
function createMetricsInterceptorProvider(
  collector: OperationMetricsCollector,
) {
  return (options: grpcJs.InterceptorOptions, nextCall: grpcJs.NextCall) => {
    // savedReceiveMetadata and savedReceiveStatus are not strictly needed here anymore for the interceptor's own state
    // OperationStart and AttemptStart will be called by the calling code (`fakeReadModifyWriteRow`)
    return new grpcJs.InterceptingCall(nextCall(options), {
      start: (metadata, listener, next) => {
        // AttemptStart is called by the orchestrating code
        const newListener: grpcJs.Listener = {
          onReceiveMetadata: (metadata, nextMd) => {
            collector.onMetadataReceived(
              metadata as unknown as {
                internalRepr: Map<string, string[]>;
                options: {};
              },
            );
            nextMd(metadata);
          },
          onReceiveStatus: (status, nextStat) => {
            collector.onStatusMetadataReceived(
              status as unknown as ServerStatus,
            );
            nextStat(status);
          },
        };
        next(metadata, newListener);
      },
    });
  };
}

export function withInterceptors(
  gaxOptions: CallOptions,
  metricsCollector?: OperationMetricsCollector,
) {
  if (metricsCollector) {
    const interceptor = createMetricsInterceptorProvider(metricsCollector);
    if (!gaxOptions.otherArgs) {
      gaxOptions.otherArgs = {};
    }
    if (!gaxOptions.otherArgs.options) {
      gaxOptions.otherArgs.options = {};
    }
    if (!gaxOptions.otherArgs.options.interceptors) {
      gaxOptions.otherArgs.options.interceptors = [interceptor];
    }
  }
  return gaxOptions;
}
