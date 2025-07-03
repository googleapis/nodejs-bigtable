import {Bigtable, Table} from '../src';
import {Rule} from '../src/row';

async function testCreateRules() {
  const bigtable = new Bigtable();
  const instance = bigtable.instance('your-instance-id'); // Replace with your instance ID
  const table: Table = instance.table('your-table-id'); // Replace with your table ID
  const row = table.row('your-row-key'); // Replace with your row key

  const rules: Rule | Rule[] = [
    {
      column: 'your-family:your-column', // Replace with your column family and qualifier
      append: '-appended',
    },
  ];

  try {
    const [response] = await row.createRules(rules);
    console.log('createRules successful:', response);
    // Add more specific assertions based on expected response if needed. For example:
    // assert.ok(response.row);
  } catch (err) {
    console.error('Error during createRules:', err);
    throw err; // Or handle the error appropriately for your test framework.
  }
}

describe('readModifyWriteRow', () => {
  it('run test', async () => {
    await testCreateRules();
  });
});
