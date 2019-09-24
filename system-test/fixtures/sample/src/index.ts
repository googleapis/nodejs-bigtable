import {Bigtable} from '@google-cloud/bigtable';
async function main() {
  const bigtable = new Bigtable();
  console.log(bigtable);
}
main();
