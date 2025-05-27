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

import * as os from 'os';
import * as crypto from 'crypto';

/**
 * Generates a unique client identifier string.
 *
 * This function creates a client identifier that incorporates the hostname,
 * process ID, and a UUID to ensure uniqueness across different client instances
 * and processes. The identifier follows the pattern:
 *
 * `node-<uuid>-<pid><hostname>`
 *
 * where:
 * - `<uuid>` is a randomly generated UUID (version 4).
 * - `<pid>` is the process ID of the current Node.js process.
 * - `<hostname>` is the hostname of the machine.
 *
 * @returns {string} A unique client identifier string.
 */
export function generateClientUuid() {
  const hostname = os.hostname() || 'localhost';
  const currentPid = process.pid || '';
  const uuid4 = crypto.randomUUID();
  return `node-${uuid4}-${currentPid}${hostname}`;
}
