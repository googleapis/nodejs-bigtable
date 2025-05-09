import {Bigtable} from '../src';

describe.only('Fetch project test', () => {
  it('run test', () => {
    console.log('before client creation');
    const bigtable = new Bigtable();
    console.log('after client creation');
  });
});
