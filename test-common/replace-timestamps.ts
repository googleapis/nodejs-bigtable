import {expectedOtelExportInput} from './expected-otel-export-input';

/**
 * Replaces the timestamp values within an `ExportInput` object with
 * standardized test values.
 *
 * This function is designed for testing purposes to make timestamp comparisons
 * in tests more predictable and reliable. It recursively traverses the
 * `ExportInput` object, finds all `startTime` and `endTime` properties, and
 * replaces their numeric values with standardized test values.
 */
export function replaceTimestamps(
  request: typeof expectedOtelExportInput,
  newStartTime: [number, number],
  newEndTime: [number, number]
) {
  request.scopeMetrics.forEach(scopeMetric => {
    scopeMetric.metrics.forEach(metric => {
      metric.dataPoints.forEach(dataPoint => {
        dataPoint.startTime = newStartTime;
        dataPoint.endTime = newEndTime;
      });
    });
  });
}
