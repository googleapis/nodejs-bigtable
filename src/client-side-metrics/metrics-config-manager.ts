import {GCPMetricsHandler} from './gcp-metrics-handler';
import {IMetricsHandler} from './metrics-handler';
import {
  ITabularApiSurface,
  OperationMetricsCollector,
} from './operation-metrics-collector';
import {MethodName, StreamingState} from './client-side-metrics-attributes';
import {ClientOptions} from 'google-gax';

/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
export class ClientSideMetricsConfigManager {
  private static gcpHandlerStore = new Map();

  static createOperation(
    methodName: MethodName,
    streaming: StreamingState,
    table: ITabularApiSurface,
  ): OperationMetricsCollector | undefined {
    if (table.bigtable.metricsEnabled) {
      return new OperationMetricsCollector(table, methodName, streaming);
    } else {
      return;
    }
  }

  static getGcpHandlerForProject(
    projectId: string,
    options: ClientOptions,
  ): GCPMetricsHandler {
    // share a single GCPMetricsHandler for each project, to avoid sampling errors
    if (this.gcpHandlerStore.has(projectId)) {
      return this.gcpHandlerStore.get(projectId)!;
    } else {
      const newHandler = new GCPMetricsHandler(options);
      this.gcpHandlerStore.set(projectId, newHandler);
      return newHandler;
    }
  }
}
