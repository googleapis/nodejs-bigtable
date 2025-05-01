import { GCPMetricsHandler } from "./gcp-metrics-handler";
import { IMetricsHandler } from "./metrics-handler";
import { OperationMetricsCollector } from "./operation-metrics-collector";

/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
export class ClientSideMetricsConfigManager {
    private static gcpHandlerStore = new Map();
    metricsHandlers: IMetricsHandler[];


    constructor(handlers: IMetricsHandler[]) {
        this.metricsHandlers = handlers
    }

    createOperation(methodName, streaming, table): OperationMetricsCollector {
        return new OperationMetricsCollector(table, methodName, streaming, this)
    }

    static getGcpHandlerForProject(projectId, options): GCPMetricsHandler {
        // share a single GCPMetricsHandler for each project, to avoid sampling errors
        if (this.gcpHandlerStore.has(projectId)){
            return this.gcpHandlerStore[projectId]
        } else {
            const newHandler = new GCPMetricsHandler(options)
            this.gcpHandlerStore[projectId] = newHandler
            return newHandler
        }
    }

}