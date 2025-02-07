import {MetricExporter} from '@google-cloud/opentelemetry-cloud-monitoring-exporter';
import {ResourceMetrics} from '@opentelemetry/sdk-metrics';
import {ServiceError} from 'google-gax';
import {MetricServiceClient} from '@google-cloud/monitoring';

interface ExportResult {
  code: number;
}

export function metricsToRequest(metrics: ResourceMetrics) {
  return {};
}

export class CloudMonitoringExporter extends MetricExporter {
  private monitoringClient = new MetricServiceClient();

  export(
    metrics: ResourceMetrics,
    resultCallback: (result: ExportResult) => void
  ): void {
    (async () => {
      try {
        const request = metricsToRequest(metrics);
        await this.monitoringClient.createTimeSeries(request);
        const exportResult = {code: 0};
        resultCallback(exportResult);
      } catch (error) {
        const exportResult = {code: (error as ServiceError).code as number};
        resultCallback(exportResult);
      }
    })();
  }
}
