const instanceId = 'dan-bigtable-instance1';
const tableId = 'events-table78';
const clusterId = 'cluster-id';
const backupId = 'new-backup';
const familyId = 'some-id';
const appProfileId = 'some-id';

async function main() {
  const {Bigtable} = require('@google-cloud/bigtable').v2;
  const bigtableClient = new Bigtable();
  const projectId = await bigtableClient.getProjectId();

  const query = `SELECT
                    _key
                  from \`${tableId}\` WHERE _key=@row_key`;
  const request = {
    instanceName: `projects/${projectId}/instances/${instanceId}`,
    query,
    params: {
      fields: {
        row_key: {
          stringValue: 'alincoln',
        },
      },
    },
  };
  bigtableClient
    .executeQueryStream(request)
    .on('error', err => {
      // Handle the error.
    })
    .on('data', row => {
      // `row` is a QueryResultRow object.
    })
    .on('end', () => {
      // All rows retrieved.
    });

  // If you anticipate many results, you can end a stream early to prevent
  // unnecessary processing.
  //-
  // instance
  //   .createExecuteQueryStream(options)
  //   .on('data', function (row) {
  //     this.end();
  //   });

  // [END bigtable_api_create_query_stream]
}

main(...process.argv.slice(2)).catch(console.error);
