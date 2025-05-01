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

    createOperation(methodName, streaming, table): OperationMetricsCollector | null{
        if (this.metricsHandlers.length == 0) {
            // I see your current code passes null OperationMetricsCollectors if csm is disabled, so I followed suit here.
            // But it might be better to keep the whole stack the same even with no handlers at the end? That would keep the code simpler and avoid optionals
            return null
        } else {
            return new OperationMetricsCollector(table, table.bigtable.projectId, methodName, streaming, this.metricsHandlers)
        }
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