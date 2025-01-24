import {Attributes} from '../../common/client-side-metrics-attributes';
import * as fs from 'fs';
import {IMetricsHandler} from './metrics-handler';

/**
 * An interface representing a Date-like object.  Provides a `getTime` method
 * for retrieving the time value in milliseconds.  Used for abstracting time
 * in tests.
 */
interface DateLike {
  /**
   * Returns the time value in milliseconds.
   * @returns The time value in milliseconds.
   */
  getTime(): number;
}

/**
 * Interface for a provider that returns DateLike objects. Used for mocking dates in tests.
 */
interface DateProvider {
  /**
   * Returns a DateLike object.
   * @returns A DateLike object representing the current time or a fake time value.
   */
  getDate(): DateLike;
}

/**
 * The default DateProvider implementation.  Returns the current date and time.
 */
class DefaultDateProvider {
  /**
   * Returns a new Date object representing the current time.
   * @returns {Date} The current date and time.
   */
  getDate() {
    return new Date();
  }
}

/**
 * An interface representing a tabular API surface, such as a Bigtable table.
 */
export interface ITabularApiSurface {
  instance: {
    id: string;
  };
  id: string;
  bigtable: {
    appProfileId?: string;
  };
}

/**
 * Information about a Bigtable operation.
 */
interface OperationInfo {
  /**
   * The number of retries attempted for the operation.
   */
  retries?: number;
  /**
   * The final status of the operation (e.g., 'OK', 'ERROR').
   */
  finalOperationStatus: string;
  /**
   * Number of times a connectivity error occurred during the operation.
   */
  connectivityErrorCount?: number;
  streamingOperation: string;
}

/**
 * Information about a single attempt of a Bigtable operation.
 */
interface AttemptInfo {
  /**
   * The final status of the attempt (e.g., 'OK', 'ERROR').
   */
  finalOperationStatus: string;
  /**
   * Whether the operation is a streaming operation or not
   */
  streamingOperation: string;
}

const packageJSON = fs.readFileSync('package.json');
const version = JSON.parse(packageJSON.toString()).version;

// TODO: Check if metrics tracer method exists.

/**
 * A class for tracing and recording client-side metrics related to Bigtable operations.
 */
export class MetricsCollector {
  private operationStartTime: DateLike | null;
  private attemptStartTime: DateLike | null;
  private zone: string | null | undefined;
  private cluster: string | null | undefined;
  private tabularApiSurface: ITabularApiSurface;
  private methodName: string;
  private projectId?: string;
  private receivedFirstResponse: boolean;
  private metricsHandlers: IMetricsHandler[];
  private firstResponseLatency?: number;
  private serverTimeRead: boolean;
  private serverTime?: number;
  private dateProvider: DateProvider;

  /**
   * @param {ITabularApiSurface} tabularApiSurface Information about the Bigtable table being accessed.
   * @param {string} methodName The name of the method being traced.
   * @param {string} projectId The id of the project.
   * @param {DateProvider} dateProvider A provider for date/time information (for testing).
   */
  constructor(
    tabularApiSurface: ITabularApiSurface,
    metricsHandlers: IMetricsHandler[],
    methodName: string,
    projectId?: string,
    dateProvider?: DateProvider
  ) {
    this.zone = null;
    this.cluster = null;
    this.tabularApiSurface = tabularApiSurface;
    this.methodName = methodName;
    this.operationStartTime = null;
    this.attemptStartTime = null;
    this.receivedFirstResponse = false;
    this.metricsHandlers = metricsHandlers;
    this.serverTimeRead = false;
    this.projectId = projectId;
    if (dateProvider) {
      this.dateProvider = dateProvider;
    } else {
      this.dateProvider = new DefaultDateProvider();
    }
  }

  /**
   * Assembles the basic attributes for metrics. These attributes provide
   * context about the Bigtable environment and the operation being performed.
   * @param {string} projectId The Google Cloud project ID.
   * @returns {Attributes} An object containing the basic attributes.
   */
  private getBasicAttributes(projectId: string) {
    return {
      projectId,
      instanceId: this.tabularApiSurface.instance.id,
      table: this.tabularApiSurface.id,
      cluster: this.cluster,
      zone: this.zone,
      appProfileId: this.tabularApiSurface.bigtable.appProfileId,
      methodName: this.methodName,
      clientName: `nodejs-bigtable/${version}`,
    };
  }

  /**
   * Assembles the attributes for operation latency metrics.  These attributes
   * provide context about the Bigtable environment, the operation being performed, and the final status of the operation.
   * Includes whether the operation was a streaming operation or not.
   * @param {string} projectId The Google Cloud project ID.
   * @param {string} finalOperationStatus The final status of the operation.
   * @param {string} streamOperation Whether the operation was a streaming operation or not.
   * @returns {Attributes} An object containing the attributes for operation latency metrics.
   */
  private getOperationLatencyAttributes(
    projectId: string,
    finalOperationStatus: string,
    streamOperation?: string
  ): Attributes {
    return Object.assign(
      {
        finalOperationStatus: finalOperationStatus,
        streamingOperation: streamOperation,
      },
      this.getBasicAttributes(projectId)
    );
  }

  /**
   * Assembles the attributes for attempt metrics. These attributes provide context
   * about the Bigtable environment, the operation being performed, and the status of the attempt.
   * Includes whether the operation was a streaming operation or not.
   * @param {string} projectId The Google Cloud project ID.
   * @param {string} attemptStatus The status of the attempt.
   * @param {string} streamingOperation Whether the operation was a streaming operation or not.
   * @returns {Attributes} An object containing the attributes for attempt metrics.
   */
  private getAttemptAttributes(
    projectId: string,
    attemptStatus: string,
    streamingOperation: string
  ) {
    return Object.assign(
      {
        attemptStatus: attemptStatus,
        streamingOperation: streamingOperation,
      },
      this.getBasicAttributes(projectId)
    );
  }

  /**
   * Called when the operation starts. Records the start time.
   */
  onOperationStart() {
    this.operationStartTime = this.dateProvider.getDate();
  }

  /**
   * Called when an attempt (e.g., an RPC attempt) completes. Records attempt latencies.
   * @param {AttemptInfo} info Information about the completed attempt.
   */
  onAttemptComplete(info: AttemptInfo) {
    const endTime = this.dateProvider.getDate();
    const projectId = this.projectId;
    if (projectId && this.attemptStartTime) {
      const attributes = this.getAttemptAttributes(
        projectId,
        info.finalOperationStatus,
        info.streamingOperation
      );
      const totalTime = endTime.getTime() - this.attemptStartTime.getTime();
      this.metricsHandlers.forEach(metricsHandler => {
        if (metricsHandler.onAttemptComplete) {
          metricsHandler.onAttemptComplete(
            {
              attemptLatency: totalTime,
              serverLatency: this.serverTime,
            },
            attributes
          );
        }
      });
    }
  }

  /**
   * Called when a new attempt starts. Records the start time of the attempt.
   */
  onAttemptStart() {
    this.attemptStartTime = this.dateProvider.getDate();
    this.serverTime = undefined;
    this.serverTimeRead = false;
    this.firstResponseLatency = undefined;
    this.receivedFirstResponse = false;
  }

  /**
   * Called when the first response is received. Records first response latencies.
   * @param {string} finalOperationStatus The final status of the operation.
   */
  onResponse() {
    const endTime = this.dateProvider.getDate();
    const projectId = this.projectId;
    if (projectId && this.operationStartTime) {
      const totalTime = endTime.getTime() - this.operationStartTime.getTime();
      if (!this.receivedFirstResponse) {
        this.receivedFirstResponse = true;
        this.firstResponseLatency = totalTime;
      }
    }
  }

  /**
   * Called when an operation completes (successfully or unsuccessfully).
   * Records operation latencies, retry counts, and connectivity error counts.
   * @param {OperationInfo} info Information about the completed operation.
   */
  onOperationComplete(info: OperationInfo) {
    const endTime = this.dateProvider.getDate();
    const projectId = this.projectId;
    this.onAttemptComplete(info);
    if (projectId && this.operationStartTime) {
      const totalTime = endTime.getTime() - this.operationStartTime.getTime();
      {
        // This block records operation latency metrics.
        const operationLatencyAttributes = this.getOperationLatencyAttributes(
          projectId,
          info.finalOperationStatus,
          info.streamingOperation
        );
        const metrics = {
          operationLatency: totalTime,
          firstResponseLatency: this.firstResponseLatency,
          retryCount: info.retries,
          connectivityErrorCount: info.connectivityErrorCount,
        };
        this.metricsHandlers.forEach(metricsHandler => {
          if (metricsHandler.onOperationComplete) {
            metricsHandler.onOperationComplete(
              metrics,
              operationLatencyAttributes
            );
          }
        });
      }
    }
  }

  /**
   * Called when metadata is received. Extracts server timing information if available.
   * @param {AttemptInfo} info Information about the completed attempt.
   * @param {object} metadata The received metadata.
   */
  onMetadataReceived(
    info: AttemptInfo,
    metadata: {
      internalRepr: Map<string, Buffer>;
      options: {};
    }
  ) {
    const mappedEntries = new Map(
      Array.from(metadata.internalRepr.entries(), ([key, value]) => [
        key,
        value.toString(),
      ])
    );
    const durationValues = mappedEntries.get('server-timing')?.split('dur=');
    if (durationValues && durationValues[1]) {
      if (!this.serverTimeRead) {
        this.serverTimeRead = true;
        const serverTime = parseInt(durationValues[1]);
        const projectId = this.projectId;
        if (projectId) {
          this.serverTime = serverTime;
        }
      }
    }
  }

  /**
   * Called when status information is received. Extracts zone and cluster information.
   * @param {object} status The received status information.
   */
  onStatusReceived(status: {
    metadata: {internalRepr: Map<string, Buffer>; options: {}};
  }) {
    const mappedEntries = new Map(
      Array.from(status.metadata.internalRepr.entries(), ([key, value]) => [
        key,
        value.toString(),
      ])
    );
    const instanceInformation = mappedEntries
      .get('x-goog-ext-425905942-bin')
      ?.replace(new RegExp('\\n', 'g'), '')
      .split('\r');
    if (instanceInformation && instanceInformation[0]) {
      this.zone = instanceInformation[0];
    }
    if (instanceInformation && instanceInformation[1]) {
      this.cluster = instanceInformation[1];
    }
  }
}
