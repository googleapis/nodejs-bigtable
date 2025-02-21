import * as assert from 'assert';
import {describe} from 'mocha';
import {metricsToRequest} from '../../src/client-side-metrics/exporter';
import {
  expectedOtelExportConvertedValue,
  expectedOtelExportInput,
} from '../../test-common/expected-otel-export-input';

describe('Bigtable/metricsToRequest', () => {
  it('Converts an otel request to a request ready for the metric service client', () => {
    const convertedValue = metricsToRequest(expectedOtelExportInput);
    assert.deepStrictEqual(
      convertedValue.timeSeries.length,
      expectedOtelExportConvertedValue.timeSeries.length
    );
    for (let index = 0; index < convertedValue.timeSeries.length; index++) {
      // We need to compare pointwise because mocha truncates to an 8192 character limit.
      assert.deepStrictEqual(
        convertedValue.timeSeries[index],
        expectedOtelExportConvertedValue.timeSeries[index]
      );
    }
  });
});
