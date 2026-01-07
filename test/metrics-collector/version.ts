// eslint-disable-next-line n/no-extraneous-import
import {describe} from 'mocha';
import {execSync} from 'node:child_process';

describe('Bigtable/CSMVersion', () => {
  it('Fetches the right client side metrics version', async () => {
    execSync('cd test/metrics-collector && node get-version-script');
  });
});
