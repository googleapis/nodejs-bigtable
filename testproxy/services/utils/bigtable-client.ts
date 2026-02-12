// Copyright 2026 Google LLC
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

import {Bigtable} from '../../../src';
import {ClientSideMetricsConfigManager} from '../../../src/client-side-metrics/metrics-config-manager';
import {IMetricsHandler} from '../../../src/client-side-metrics/metrics-handler';
import {BigtableClient} from '../../../src/v2';

const v2 = Symbol.for('v2');

export function createBigtableClient(bigtable: Bigtable) {
  const handlers: IMetricsHandler[] = [];
  bigtable._metricsConfigManager = new ClientSideMetricsConfigManager(handlers);

  // We'll store these in the Bigtable object so that we can access them from the
  // test proxy.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (bigtable as any)[v2] = new BigtableClient(bigtable.options.BigtableClient);
}

export function getBigtableClient(bigtable: Bigtable) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (bigtable as any)[v2];
}
