import { GCPMetricsHandler } from "./gcp-metrics-handler";
import { IMetricsHandler } from "./metrics-handler";
import { OperationMetricsCollector } from "./operation-metrics-collector";

/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
export class ClientSideMetricsConfigManager {
    metricsHandlers: IMetricsHandler[];


    constructor(handlers: IMetricsHandler[]) {
        this.metricsHandlers = handlers
    }

    createOperation(methodName, streaming, table): OperationMetricsCollector {
        return new OperationMetricsCollector(table, methodName, streaming, this.metricsHandlers)
    }

}