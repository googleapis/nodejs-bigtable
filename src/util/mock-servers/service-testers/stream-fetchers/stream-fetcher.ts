import internal = require('stream');

export abstract class StreamFetcher {
  abstract fetchStream(): internal.PassThrough;
}
