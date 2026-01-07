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

// eslint-disable-next-line n/no-extraneous-import
import {describe} from 'mocha';
import {execSync} from 'node:child_process';

describe('Bigtable/CSMVersion', () => {
  it('Fetches the right client side metrics version', async () => {
    // It is critical to ensure a fixed environment so that the metrics handler
    // always gets a request when the readRows call is made.

    // 1. Create a clean copy of the current environment
    const cleanEnv = {...process.env};

    // 2. CRITICAL: Remove emulator variables so the client uses the mock
    delete cleanEnv.BIGTABLE_EMULATOR_HOST;
    delete cleanEnv.BIGTABLE_INSTANCE_ADMIN_EMULATOR_HOST;
    delete cleanEnv.GOOGLE_APPLICATION_CREDENTIALS; // Safe measure

    execSync('cd test/metrics-collector && node get-version-script');
  });
});
