import { GCPMetricsHandler } from "./gcp-metrics-handler";
import { OperationMetricsCollector } from "./operation-metrics-collector";

/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
export class ClientSideMetricsController {
    static handlerStore = new Map();
    metricsHandlers: IMetricsHandler[];


    constructor(projectId, auth) {
        // TODO: in the future, we can allow configuring different handlers
        const gcp_handler = ClientSideMetricsController.getHandlerForProject(projectId, auth)
        this.metricsHandlers = [gcp_handler]
    }

    createOperation(methodName, streaming, table): OperationMetricsCollector{
        return new OperationMetricsCollector(table, table.bigtable.projectId, methodName, streaming, this.metricsHandlers)
    }

    static getHandlerForProject(projectId, auth): GCPMetricsHandler {
        // share a single GCPMetricsHandler for each project, to avoid sampling errors
        if (this.handlerStore.has(projectId)){
            return this.handlerStore[projectId]
        } else {
            const newHandler = new GCPMetricsHandler(projectId, auth)
            this.handlerStore[projectId] = newHandler
            return newHandler
        }
    }

}