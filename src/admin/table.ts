// Copyright 2025 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {BigtableTableAdminClient} from './v2';
import {LROperation, CallOptions} from 'google-gax';

import {google} from '../../protos/protos';

/**
 * Service for creating, configuring, and deleting Cloud Bigtable tables.
 * Provides access to the table schemas only, not the data stored within
 * the tables.
 *
 * While users may create an instance of this class using the standard GAPIC
 * constructor parameters, it's recommended to obtain one by way of the
 * Bigtable.getTableAdminClient() method so that authentication and
 * configuration are all handled uniformly.
 *
 * @class
 * @memberof admin
 */
export class TableAdminClient extends BigtableTableAdminClient {
  // This is largely copied from the GAPIC doc.
  /**
   * Create a new table by restoring from a completed backup.  The
   * returned table {@link protos.google.longrunning.Operation|long-running operation} can
   * be used to track the progress of the operation, and to cancel it.  The
   * {@link protos.google.longrunning.Operation.metadata|metadata} field type is
   * {@link protos.google.bigtable.admin.v2.RestoreTableMetadata|RestoreTableMetadata}.  The
   * {@link protos.google.longrunning.Operation.response|response} type is
   * {@link protos.google.bigtable.admin.v2.Table|Table}, if successful.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The name of the instance in which to create the restored
   *   table. Values are of the form `projects/<project>/instances/<instance>`.
   * @param {string} request.tableId
   *   Required. The id of the table to create and restore to. This
   *   table must not already exist. The `table_id` appended to
   *   `parent` forms the full table name of the form
   *   `projects/<project>/instances/<instance>/tables/<table_id>`.
   * @param {string} request.backup
   *   Name of the backup from which to restore.  Values are of the form
   *   `projects/<project>/instances/<instance>/clusters/<cluster>/backups/<backup>`.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to a {@link protos.google.bigtable.admin.v2.RestoreTableMetadata|RestoreTableMetadata}.
   */
  async restoreAndWait(
    restoreParameters: google.bigtable.admin.v2.IRestoreTableRequest,
    options?: CallOptions,
  ): Promise<google.bigtable.admin.v2.IRestoreTableMetadata> {
    const [lro] = await this.restoreTable(restoreParameters, options);

    const [, metadata] = await lro.promise();

    return metadata;
  }

  // This one doesn't get generated in GAPIC, because it's "hidden" in proto
  // return types rather than being part of a method. This helper does the same
  // thing as e.g. checkRestoreTableStatus.
  // TODO? - just call the checkRestoreTableStatus method and shift the type?
  private async getOptimizeLRO(name: string, options?: CallOptions) {
    // We want to use the same gax module as the base class, but it's private.
    const gaxModule = this['_gaxModule'];
    const request =
      new gaxModule.operationsProtos.google.longrunning.GetOperationRequest({
        name,
      });
    const [operation] = await this.operationsClient.getOperation(
      request,
      options,
    );
    const decodeOperation = new gaxModule.Operation(
      operation,
      this.descriptors.longrunning.restoreTable,
      gaxModule.createDefaultBackoffSettings(),
    );
    return decodeOperation as LROperation<
      google.bigtable.admin.v2.Table,
      google.bigtable.admin.v2.OptimizeRestoredTableMetadata
    >;
  }

  async checkOptimizeTableProgress(
    name: string,
    options?: CallOptions,
  ): Promise<
    LROperation<
      google.bigtable.admin.v2.Table,
      google.bigtable.admin.v2.OptimizeRestoredTableMetadata
    >
  > {
    return await this.getOptimizeLRO(name, options);
  }

  async waitForTableOptimization(
    metadata: google.bigtable.admin.v2.IRestoreTableMetadata,
    options?: CallOptions,
  ) {
    const lro = await this.checkOptimizeTableProgress(
      metadata.optimizeTableOperationName!,
      options,
    );
    return await lro.promise();
  }

  async waitForConsistency(
    tableName: string,
    timeoutSeconds?: number,
    checkIntervalSeconds = 5,
    options?: CallOptions,
  ): Promise<void> {
    // 1. Generate a consistency token
    const [token] = await this.generateConsistencyToken(
      {
        name: tableName,
      },
      options,
    );

    let isConsistent = false;
    let totalSeconds = 0;
    while (!isConsistent) {
      // 2. Check for consistency
      const request = {
        name: tableName,
        consistencyToken: token.consistencyToken,
      };
      const [consistent] = await this.checkConsistency(request, options);

      // Protos assume optional, so just be sure.
      isConsistent = consistent.consistent ?? false;

      if (isConsistent) {
        return;
      } else {
        // console.log('Data is not yet consistent. Retrying in 5 seconds...');
        // 3. Wait before retrying
        await new Promise(resolve => {
          setTimeout(resolve, checkIntervalSeconds * 1000);
          totalSeconds += checkIntervalSeconds;
          if (timeoutSeconds !== undefined && totalSeconds >= timeoutSeconds) {
            throw new Error(
              `Timed out waiting for consistency check (${totalSeconds}s)`,
            );
          }
        });
      }
    }
  }
}
