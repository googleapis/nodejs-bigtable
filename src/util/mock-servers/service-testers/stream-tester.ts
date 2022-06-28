import {ServiceHandler} from './service-handlers/service-handler';
import {StreamFetcher} from './stream-fetchers/stream-fetcher';
import {ServiceError} from 'google-gax';
import * as snapshot from 'snap-shot-it';

export class StreamTester {
  serviceHandler: ServiceHandler;
  streamFetcher: StreamFetcher;

  constructor(serviceHandler: ServiceHandler, streamFetcher: StreamFetcher) {
    this.serviceHandler = serviceHandler;
    this.streamFetcher = streamFetcher;
  }

  checkSnapshots(callback: () => void): void {
    this.serviceHandler.setupService();
    this.streamFetcher.fetchStream().on('error', (error: ServiceError) => {
      snapshot(this.serviceHandler.snapshotOutput());
      callback();
    });
  }
}
