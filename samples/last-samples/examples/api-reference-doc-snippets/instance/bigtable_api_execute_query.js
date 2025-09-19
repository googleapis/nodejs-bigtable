async function main(instanceId = 'YOUR_INSTANCE_ID', tableId = 'YOUR_TABLE_ID') {
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
    .executeQuery(request)
    .then(result => {
      const rows = result[0];
    })
    .catch(err => {
      // Handle errors
    });

  // [END bigtable_api_execute_query]
}

main(...process.argv.slice(2)).catch(console.error);
