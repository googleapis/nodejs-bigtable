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
