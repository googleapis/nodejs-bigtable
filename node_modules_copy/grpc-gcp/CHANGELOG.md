# Changelog

## [1.0.1](https://github.com/GoogleCloudPlatform/grpc-gcp-node/compare/v1.0.0...v1.0.1) (2023-01-23)


### Bug Fixes

* Define a generic interface to allow flexibility ([7e12a66](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/7e12a662a3a02b0ee057a69dae872fd86c4bd1fc))

## [1.0.0](https://github.com/GoogleCloudPlatform/grpc-gcp-node/compare/v0.4.2...v1.0.0) (2022-09-14)


### ⚠ BREAKING CHANGES

* require Node.js 12+ (#156)

### Bug Fixes

* **deps:** update dependency @google-cloud/error-reporting to v3 ([#150](https://github.com/GoogleCloudPlatform/grpc-gcp-node/issues/150)) ([4fc086f](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/4fc086ffa8ce014b4f46e9b4a2810c0daa6c6737))
* **deps:** update dependency @grpc/grpc-js to ~1.7.0 ([#155](https://github.com/GoogleCloudPlatform/grpc-gcp-node/issues/155)) ([8dc6d31](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/8dc6d31d0ad096af3f9a62d8ae74bd864d289bd4))
* **grpc:** loosen version range on @grpc/grpc-js ([#153](https://github.com/GoogleCloudPlatform/grpc-gcp-node/issues/153)) ([ad35ce7](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/ad35ce7f582b206884fc556f533edc02269ee064))


### Build System

* require Node.js 12+ ([#156](https://github.com/GoogleCloudPlatform/grpc-gcp-node/issues/156)) ([4a71e84](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/4a71e841db041e957b66a20596347c9aca0e0807))

### [0.4.2](https://github.com/GoogleCloudPlatform/grpc-gcp-node/compare/v0.4.1...v0.4.2) (2022-04-18)


### Bug Fixes

* **deps:** update dependency @grpc/grpc-js to ~1.6.0 ([#143](https://github.com/GoogleCloudPlatform/grpc-gcp-node/issues/143)) ([9e448f0](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/9e448f0a99468fa570846b790a26233ef49a003e))

### [0.4.1](https://github.com/GoogleCloudPlatform/grpc-gcp-node/compare/v0.4.0...v0.4.1) (2022-04-06)


### Bug Fixes

* match grpc version to gax ([#141](https://github.com/GoogleCloudPlatform/grpc-gcp-node/issues/141)) ([5b86ac8](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/5b86ac895a69d583f43d02c9ff45683167b36c35))

## [0.4.0](https://github.com/GoogleCloudPlatform/grpc-gcp-node/compare/v0.3.3...v0.4.0) (2022-04-06)


### Features

* add ability to periodically request debug headers ([#139](https://github.com/GoogleCloudPlatform/grpc-gcp-node/issues/139)) ([e551d92](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/e551d92cc73909fadd3df3f541be6870137bd24c))
* add configuration for minimum number of channels ([#136](https://github.com/GoogleCloudPlatform/grpc-gcp-node/issues/136)) ([2140577](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/2140577e897391712215766567dd85226945b56a))


### Bug Fixes

* add a stub implementation of channelz in the channel pool to fix compilation ([#137](https://github.com/GoogleCloudPlatform/grpc-gcp-node/issues/137)) ([a05c3dd](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/a05c3dddeda6a31981d4124f2279f27f818c5c5a))
* **deps:** update dependency argparse to v2 ([#93](https://github.com/GoogleCloudPlatform/grpc-gcp-node/issues/93)) ([fd9ed4a](https://github.com/GoogleCloudPlatform/grpc-gcp-node/commit/fd9ed4a9a5f50d87c77da6e98227f580bc70595e))
