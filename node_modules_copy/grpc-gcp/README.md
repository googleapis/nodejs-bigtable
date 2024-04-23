# gRPC-GCP for Node.js

A Node.js module providing grpc supports for Google Cloud APIs.

## Installation

```sh
npm install grpc-gcp --save
```

## Usage

Let's use Spanner API as an example.

First, Create a json file defining API configuration, with ChannelPoolConfig and MethodConfig.

```json
{
  "channelPool": {
    "maxSize": 10,
    "maxConcurrentStreamsLowWatermark": 1
  },
  "method": [
    {
      "name": [ "/google.spanner.v1.Spanner/CreateSession" ],
      "affinity": {
        "command": "BIND",
        "affinityKey": "name"
      }
    },
    {
      "name": [ "/google.spanner.v1.Spanner/GetSession" ],
      "affinity": {
        "command": "BOUND",
        "affinityKey": "name"
      }
    },
    {
      "name": [ "/google.spanner.v1.Spanner/DeleteSession" ],
      "affinity": {
        "command": "UNBIND",
        "affinityKey": "name"
      }
    }
  ]
}
```

Load configuration to ApiConfig.

```javascript
// @grpc/grpc-js can be used in place of grpc with no changes
var grpc = require('grpc');
var grpcGcp = require('grpc-gcp')(grpc);
var fs = require('fs');

var apiDefinition = JSON.parse(fs.readFileSync('your_api_config_json_file'));
var apiConfig = grpcGcp.createGcpApiConfig(apiDefinition);
```

Pass `gcpChannelFactoryOverride` and `gcpCallInvocationTransformer` to channel options when initializing api client.

```javascript
var channelOptions = {
  channelFactoryOverride: grpcGcp.gcpChannelFactoryOverride,
  callInvocationTransformer: grpcGcp.gcpCallInvocationTransformer,
  gcpApiConfig: apiConfig,
};

var client = new SpannerClient(
  'spanner.googleapis.com:443',
  channelCreds,
  channelOptions
);
```

## Build from source

Download source.

```sh
git clone https://github.com/GoogleCloudPlatform/grpc-gcp-node.git && cd grpc-gcp-node
```

```sh
git submodule update --init --recursive
```

Build grpc-gcp.

```sh
npm install
```

## Test

Setup credentials. See [Getting Started With Authentication](https://cloud.google.com/docs/authentication/getting-started) for more details.

```sh
export GOOGLE_APPLICATION_CREDENTIALS=path/to/key.json
```

Run unit tests.

```sh
npm test
```

Run system tests.

```sh
npm run system-test
```
