// Copyright 2018 Google LLC
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

// Imports the Google Cloud client library
const {Bigtable} = require('@google-cloud/bigtable');

async function runTableOperations(instanceID, tableID) {
  const bigtable = new Bigtable();
  const instance = bigtable.instance(instanceID);
  const table = instance.table(tableID);

  // Check if table exists
  console.log();
  console.log('Checking if table exists...');
  const [tableExists] = await table.exists();
  if (!tableExists) {
    // Create table if does not exist
    console.log(`Table does not exist. Creating table ${tableID}`);
    await table.create();
  } else {
    console.log('Table exists.');
  }

  console.log();
  console.log('Listing tables in current project...');
  // [START bigtable_list_tables]
  // List tables in current project
  const [tables] = await instance.getTables();
  tables.forEach(table => {
    console.log(table.id);
  });
  // [END bigtable_list_tables]

  console.log();
  console.log('Printing table metadata...');
  // [START bigtable_get_table_metadata]
  // Get table metadata, and apply a view to the table fields
  // Supported views include ID, schema or full
  // View defaults to schema if unspecified.
  const options = {
    view: 'id',
  };
  const [tableMetadata] = await table.getMetadata(options);
  console.log(`Metadata: ${JSON.stringify(tableMetadata)}`);
  // [END bigtable_get_table_metadata]

  console.log();
  console.log('Creating column family cf1 with max age GC rule...');
  // [START bigtable_create_family_gc_max_age]
  // Create a column family with GC policy : maximum age
  // where age = current time minus cell timestamp

  // Define the GC rule to retain data with max age of 5 days
  const maxAgeRule = {
    rule: {
      age: {
        // Value must be atleast 1 millisecond
        seconds: 60 * 60 * 24 * 5,
        nanos: 0,
      },
    },
  };

  let [family] = await table.createFamily('cf1', maxAgeRule);
  console.log(`Created column family ${family.id}`);
  // [END bigtable_create_family_gc_max_age]

  console.log();
  console.log('Creating column family cf2 with max versions GC rule...');
  // [START bigtable_create_family_gc_max_versions]
  // Create a column family with GC policy : most recent N versions
  // where 1 = most recent version

  // Define the GC policy to retain only the most recent 2 versions
  const maxVersionsRule = {
    rule: {
      versions: 2,
    },
  };

  // Create a column family with given GC rule
  [family] = await table.createFamily('cf2', maxVersionsRule);
  console.log(`Created column family ${family.id}`);
  // [END bigtable_create_family_gc_max_versions]

  console.log();
  console.log('Creating column family cf3 with union GC rule...');
  // [START bigtable_create_family_gc_union]
  // Create a column family with GC policy to drop data that matches at least one condition.

  // Define a GC rule to drop cells older than 5 days or not the most recent version
  const unionRule = {
    rule: {
      versions: 1,
      age: {
        seconds: 60 * 60 * 24 * 5,
        nanos: 0,
      },
      union: true,
    },
  };

  [family] = await table.createFamily('cf3', unionRule);
  console.log(`Created column family ${family.id}`);
  // [END bigtable_create_family_gc_union]

  console.log();
  console.log('Creating column family cf4 with intersect GC rule...');
  // [START bigtable_create_family_gc_intersection]
  // Create a column family with GC policy to drop data that matches all conditions

  // GC rule: Drop cells older than 5 days AND older than the most recent 2 versions
  const intersectionRule = {
    rule: {
      versions: 2,
      age: {
        seconds: 60 * 60 * 24 * 5,
        nanos: 0,
      },
      intersection: true,
    },
  };
  [family] = await table.createFamily('cf4', intersectionRule);
  console.log(`Created column family ${family.id}`);
  // [END bigtable_create_family_gc_intersection]

  console.log();
  console.log('Creating column family cf5 with a nested GC rule...');
  // [START bigtable_create_family_gc_nested]
  // Create a nested GC rule:
  // Drop cells that are either older than the 10 recent versions
  // OR
  // Drop cells that are older than a month AND older than the 2 recent versions
  const nestedRule = {
    union: true,
    versions: 10,
    rule: {
      versions: 2,
      age: {
        // one month
        seconds: 60 * 60 * 24 * 30,
        nanos: 0,
      },
    },
  };

  [family] = await table.createFamily('cf5', nestedRule);
  console.log(`Created column family ${family.id}`);
  // [END bigtable_create_family_gc_nested]

  console.log();
  console.log('Printing ID and GC Rule for all column families...');
  // [START bigtable_list_column_families]
  // List all families in the table with GC rules
  const [families] = await table.getFamilies();
  // Print ID, GC Rule for each column family
  families.forEach(family => {
    const metadata = JSON.stringify(family.metadata);
    console.log(`Column family: ${family.id}, Metadata: ${metadata}`);
    /* Sample output:
        Column family: projects/{{projectId}}/instances/my-instance/tables/my-table/columnFamilies/cf4,
        Metadata: {"gcRule":{"intersection":{"rules":[{"maxAge":{"seconds":"432000","nanos":0},"rule":"maxAge"},{"maxNumVersions":2,"rule":"maxNumVersions"}]},"rule":"intersection"}}
    */
  });
  // [END bigtable_list_column_families]

  console.log('\nUpdating column family cf1 GC rule...');
  // [START bigtable_update_gc_rule]
  // Update the column family metadata to update the GC rule

  // Create a reference to the column family
  family = table.family('cf1');

  // Update a column family GC rule
  const updatedMetadata = {
    rule: {
      versions: 1,
    },
  };

  const [apiResponse] = await family.setMetadata(updatedMetadata);
  console.log(`Updated GC rule: ${JSON.stringify(apiResponse)}`);
  // [END bigtable_update_gc_rule]

  console.log('\nPrint updated column family cf1 GC rule...');
  // [START bigtable_family_get_gc_rule]
  // Retrieve column family metadata (Id, column family GC rule)
  const [metadata] = await family.getMetadata();
  console.log(`Metadata: ${JSON.stringify(metadata)}`);
  // [END bigtable_family_get_gc_rule]

  console.log('\nDelete a column family cf2...');
  // [START bigtable_delete_family]
  // Delete a column family
  await family.delete();
  console.log(`${family.id} deleted successfully\n`);
  // [END bigtable_delete_family]
  console.log(
    'Run node $0 delete --instance [instanceID] --table [tableID] to delete the table.\n'
  );
}

async function deleteTable(instanceID, tableID) {
  // const instanceID = "my-instance";
  // const tableID = "my-bigtable-ID";
  const bigtableClient = new Bigtable();
  const instance = bigtableClient.instance(instanceID);
  const table = instance.table(tableID);
  // [START bigtable_delete_table]
  // Delete the entire table
  console.log('Delete the table.');
  await table.delete();
  console.log(`Table deleted: ${table.id}`);
  // [END bigtable_delete_table]
}

require('yargs')
  .demand(1)
  .command(
    'run',
    'Create a table (if does not exist) and run basic table operations.',
    {},
    argv => runTableOperations(argv.instance, argv.table)
  )
  .example(
    'node $0 run --instance [instanceID] --table [tableID]',
    'Create a table (if does not exist) and run basic table operations.'
  )
  .wrap(120)
  .command('delete', 'Delete table.', {}, argv =>
    deleteTable(argv.instance, argv.table)
  )
  .example(
    'node $0 delete --instance [instanceID] --table [tableID]',
    'Delete a table.'
  )
  .wrap(120)
  .nargs('instance', 1)
  .nargs('table', 1)
  .describe('instance', 'Cloud Bigtable Instance ID')
  .describe('table', 'Cloud Bigtable Table ID')
  .demandOption(['instance', 'table'])
  .recommendCommands()
  .epilogue('For more information, see https://cloud.google.com/bigtable/docs')
  .help()
  .strict().argv;
