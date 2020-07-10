# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/@google-cloud/bigtable?activeTab=versions

### [3.0.1](https://www.github.com/googleapis/nodejs-bigtable/compare/v3.0.0...v3.0.1) (2020-07-09)


### Bug Fixes

* **deps:** update dependency @google-cloud/bigtable to v3 ([#756](https://www.github.com/googleapis/nodejs-bigtable/issues/756)) ([e5e8189](https://www.github.com/googleapis/nodejs-bigtable/commit/e5e8189b3254a7a1d216f5380b6e88c7cdeb0c5e))
* typeo in nodejs .gitattribute ([#759](https://www.github.com/googleapis/nodejs-bigtable/issues/759)) ([843d1da](https://www.github.com/googleapis/nodejs-bigtable/commit/843d1daa9bdf30b8a5ab612967fbd8652723612d))

## [3.0.0](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.3.2...v3.0.0) (2020-07-06)


### ⚠ BREAKING CHANGES

* **types:** cluster.setMetadata(): only node count is updatable on an existing cluster; getInstancesCallback/Response: dropped nextQuery property as it is deprecated for this method, exposed failedLocations property; instance.createCluster(): removed unsupported params serveNodes and defaultStorageType
* drop node8 support, support for async iterators (#682)

### Features

* check status of long running operation by its name ([#724](https://www.github.com/googleapis/nodejs-bigtable/issues/724)) ([f2c1675](https://www.github.com/googleapis/nodejs-bigtable/commit/f2c1675d3c5352bc5a9083a7eb0a3666815e5854))
* Cloud Bigtable Managed Backup service ([21f585b](https://www.github.com/googleapis/nodejs-bigtable/commit/21f585b97aa88b95d04153984a71c51b029b57fe))
* Cloud functions example for Bigtable ([#728](https://www.github.com/googleapis/nodejs-bigtable/issues/728)) ([95a5db4](https://www.github.com/googleapis/nodejs-bigtable/commit/95a5db49cb896c82487b87638c3ad5cb4b81e91c))
* drop node8 support, support for async iterators ([#682](https://www.github.com/googleapis/nodejs-bigtable/issues/682)) ([2834e93](https://www.github.com/googleapis/nodejs-bigtable/commit/2834e93a7a6aec4ffff439850d07aa7f9ef79e7f))
* drop support for node.js 8.x ([#669](https://www.github.com/googleapis/nodejs-bigtable/issues/669)) ([7ec9150](https://www.github.com/googleapis/nodejs-bigtable/commit/7ec9150331bf5337879d91a146a713e51702164b))
* export protos in src/index.ts ([edac2c5](https://www.github.com/googleapis/nodejs-bigtable/commit/edac2c5b5c97ae301ef70776621d5cd0add79f5d))
* move to Typescript code generation ([#631](https://www.github.com/googleapis/nodejs-bigtable/issues/631)) ([6749aa5](https://www.github.com/googleapis/nodejs-bigtable/commit/6749aa5b1f56e7204ffdea7daab0217525e220ce))
* **secrets:** begin migration to secret manager from keystore ([#740](https://www.github.com/googleapis/nodejs-bigtable/issues/740)) ([85eb5d2](https://www.github.com/googleapis/nodejs-bigtable/commit/85eb5d278d5969e1b03e0a52eb08664d13f25f46))
* update bigtable grpc service config ([#747](https://www.github.com/googleapis/nodejs-bigtable/issues/747)) ([be27a70](https://www.github.com/googleapis/nodejs-bigtable/commit/be27a7022a5a3d3f704b65350d76a57385a0c2df))


### Bug Fixes

* **deps:** update dependency @google-cloud/common to v3 and handle stream ending ([#704](https://www.github.com/googleapis/nodejs-bigtable/issues/704)) ([d8ada04](https://www.github.com/googleapis/nodejs-bigtable/commit/d8ada04a189ecb3e3628b55f5a2883b5d18727fe))
* **deps:** update dependency @google-cloud/paginator to v3 ([#674](https://www.github.com/googleapis/nodejs-bigtable/issues/674)) ([9abcaee](https://www.github.com/googleapis/nodejs-bigtable/commit/9abcaee8160c89de4258b0ad0a9185f5ada634df))
* **deps:** update dependency @google-cloud/projectify to v2 ([#673](https://www.github.com/googleapis/nodejs-bigtable/issues/673)) ([b0a7aa8](https://www.github.com/googleapis/nodejs-bigtable/commit/b0a7aa8ff93b7d359cd728d240af1203aee2ffc2))
* **deps:** update dependency @google-cloud/promisify to v2 ([#672](https://www.github.com/googleapis/nodejs-bigtable/issues/672)) ([5a7d66f](https://www.github.com/googleapis/nodejs-bigtable/commit/5a7d66f061ae20e9e763d3477c38ee845f06fac7))
* **deps:** update dependency escape-string-regexp to v3 ([#697](https://www.github.com/googleapis/nodejs-bigtable/issues/697)) ([799dcca](https://www.github.com/googleapis/nodejs-bigtable/commit/799dccace91bb4742e54efcf64b688815c0f086d))
* **deps:** update dependency escape-string-regexp to v4 ([#719](https://www.github.com/googleapis/nodejs-bigtable/issues/719)) ([5c54e70](https://www.github.com/googleapis/nodejs-bigtable/commit/5c54e7089c146dedf8610e6ed730554921e24f32))
* **deps:** update dependency uuid to v8 ([#723](https://www.github.com/googleapis/nodejs-bigtable/issues/723)) ([998ec84](https://www.github.com/googleapis/nodejs-bigtable/commit/998ec842344dd2ca79736bc14dd4fa4c4b72eb25))
* **docs:** contigous to contiguous ([#637](https://www.github.com/googleapis/nodejs-bigtable/issues/637)) ([9d09d37](https://www.github.com/googleapis/nodejs-bigtable/commit/9d09d375b29bc21fcccd2c5341dc5d2046e00b7e))
* cluster id store as undefined in createInstance request ([#654](https://www.github.com/googleapis/nodejs-bigtable/issues/654)) ([809c719](https://www.github.com/googleapis/nodejs-bigtable/commit/809c7198ac933d3efea05b4451cdc327b0871598))
* **types:** improve types in index.ts ([#720](https://www.github.com/googleapis/nodejs-bigtable/issues/720)) ([508d1f9](https://www.github.com/googleapis/nodejs-bigtable/commit/508d1f9e0c5b089d7a649eb1dd9e6fc166d17f7e))
* clusterId issue in sample test(should list zones) ([#684](https://www.github.com/googleapis/nodejs-bigtable/issues/684)) ([b92dfc5](https://www.github.com/googleapis/nodejs-bigtable/commit/b92dfc58aa44cc19faaeee06c53309a032009e32))
* doc for create instance cluster id ([#642](https://www.github.com/googleapis/nodejs-bigtable/issues/642)) ([838837c](https://www.github.com/googleapis/nodejs-bigtable/commit/838837c643d61861ecbb15636375620a914aad86))
* export all available types ([#691](https://www.github.com/googleapis/nodejs-bigtable/issues/691)) ([63bb2ec](https://www.github.com/googleapis/nodejs-bigtable/commit/63bb2ec9d496148edfc31f3e716c26fda31dcb24))
* handle fallback option properly ([21f8fef](https://www.github.com/googleapis/nodejs-bigtable/commit/21f8fef9f2c08be458478d1f2ccd0be5c60446c5))
* improve types for instance ([#655](https://www.github.com/googleapis/nodejs-bigtable/issues/655)) ([4910e77](https://www.github.com/googleapis/nodejs-bigtable/commit/4910e779fb8168f6e6a7d76bf1a444c793aa7682))
* improve types for row ([#661](https://www.github.com/googleapis/nodejs-bigtable/issues/661)) ([340689e](https://www.github.com/googleapis/nodejs-bigtable/commit/340689e639e79a7fca7c6e022d4d95bd414f0003))
* improve TypeScript types ([#646](https://www.github.com/googleapis/nodejs-bigtable/issues/646)) ([f4e1b86](https://www.github.com/googleapis/nodejs-bigtable/commit/f4e1b862ab94e82312413f0b983dd67fdab24f8a))
* improve TypeScript types ([#650](https://www.github.com/googleapis/nodejs-bigtable/issues/650)) ([b54830f](https://www.github.com/googleapis/nodejs-bigtable/commit/b54830fb2ec52811c101661bce7db5d421841567))
* improve typescript types ([#663](https://www.github.com/googleapis/nodejs-bigtable/issues/663)) ([47b506a](https://www.github.com/googleapis/nodejs-bigtable/commit/47b506ae8843d78d18cef76cb19a90320a770966))
* improve typescript types for Table class ([#641](https://www.github.com/googleapis/nodejs-bigtable/issues/641)) ([68179d1](https://www.github.com/googleapis/nodejs-bigtable/commit/68179d194aeb8246e3c19e0072085cf82cf3f609))
* make sure generated protos.js have unique root name ([#690](https://www.github.com/googleapis/nodejs-bigtable/issues/690)) ([cc695db](https://www.github.com/googleapis/nodejs-bigtable/commit/cc695dbd0365c1ca6451d9d4e766e63000475b67))
* Point to team in correct org ([#729](https://www.github.com/googleapis/nodejs-bigtable/issues/729)) ([998dc4b](https://www.github.com/googleapis/nodejs-bigtable/commit/998dc4b5a41bcd7a1e12250623486cbe6ac9ab12))
* reduce through2 usage ([#711](https://www.github.com/googleapis/nodejs-bigtable/issues/711)) ([dd84765](https://www.github.com/googleapis/nodejs-bigtable/commit/dd847652eb00dd14f42211d5c9e20817aca7081b))
* remove eslint, update gax, fix generated protos, run the generator ([#699](https://www.github.com/googleapis/nodejs-bigtable/issues/699)) ([85b8585](https://www.github.com/googleapis/nodejs-bigtable/commit/85b858572018380c7a335d09d17c5629ad7fe3a3))
* **types:** stricter types are now enforced ([#733](https://www.github.com/googleapis/nodejs-bigtable/issues/733)) ([dfd22a2](https://www.github.com/googleapis/nodejs-bigtable/commit/dfd22a208ead6e97a3964354be55025c53acbf66))
* row.exists out of memory errors ([#676](https://www.github.com/googleapis/nodejs-bigtable/issues/676)) ([191aa0f](https://www.github.com/googleapis/nodejs-bigtable/commit/191aa0f577989227ebdd9a8d7718869fc623b1e9))
* update types for app profile ([#649](https://www.github.com/googleapis/nodejs-bigtable/issues/649)) ([271d480](https://www.github.com/googleapis/nodejs-bigtable/commit/271d480ada622da7ffc4bc4da64a8626dc0e0e71))
* UpdateBackupRequest.backup is a resource, not a resource reference - remove annotation ([#725](https://www.github.com/googleapis/nodejs-bigtable/issues/725)) ([0802552](https://www.github.com/googleapis/nodejs-bigtable/commit/0802552cf8d9ac4de77b231b2b26cbfc87434064))

### [2.3.2](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.3.1...v2.3.2) (2020-02-12)


### Bug Fixes

* migrate to new proto annotations ([#604](https://www.github.com/googleapis/nodejs-bigtable/issues/604)) ([e095c5a](https://www.github.com/googleapis/nodejs-bigtable/commit/e095c5a85f86fde44e7560c4599894d61180afbe))

### [2.3.1](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.3.0...v2.3.1) (2019-12-27)


### Bug Fixes

* **deps:** pin TypeScript below 3.7.0 ([0c6232d](https://www.github.com/googleapis/nodejs-bigtable/commit/0c6232df47194b2d43e86c484f25d6f3b933b605))
* **types:** overload for bigtable.getInstances ([#579](https://www.github.com/googleapis/nodejs-bigtable/issues/579)) ([91a07ba](https://www.github.com/googleapis/nodejs-bigtable/commit/91a07bab35c6ec4b8c4143c6499914aa34ef3689))

## [2.3.0](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.2.3...v2.3.0) (2019-12-03)


### Features

* implement instance and table level IAM policy ([#584](https://www.github.com/googleapis/nodejs-bigtable/issues/584)) ([5c22968](https://www.github.com/googleapis/nodejs-bigtable/commit/5c229685dacf8bebda6e030d21a2bbf2ed2cec76))
* **samples:** adds read and filter snippets ([#586](https://www.github.com/googleapis/nodejs-bigtable/issues/586)) ([896d024](https://www.github.com/googleapis/nodejs-bigtable/commit/896d02454b359f90c93e88c760ad699aa6999341)), closes [#584](https://www.github.com/googleapis/nodejs-bigtable/issues/584)


### Bug Fixes

* safe integer bounds conversion ([#576](https://www.github.com/googleapis/nodejs-bigtable/issues/576)) ([a1cd9c0](https://www.github.com/googleapis/nodejs-bigtable/commit/a1cd9c0ad5f732a13f12784f18fb895f9765ea4f))
* **deps:** update dependency yargs to v15 ([#583](https://www.github.com/googleapis/nodejs-bigtable/issues/583)) ([b95c430](https://www.github.com/googleapis/nodejs-bigtable/commit/b95c430796175f03d063ad863d685752d0534dcd))

### [2.2.3](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.2.2...v2.2.3) (2019-11-12)


### Bug Fixes

* **docs:** add jsdoc-region-tag plugin ([#571](https://www.github.com/googleapis/nodejs-bigtable/issues/571)) ([3159302](https://www.github.com/googleapis/nodejs-bigtable/commit/315930236ec396c3743d4929087e2d6565224072))
* include long in types ([1cb65a4](https://www.github.com/googleapis/nodejs-bigtable/commit/1cb65a47553ab93572bfd95825074ab362ecd9f8))

### [2.2.2](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.2.1...v2.2.2) (2019-11-11)


### Bug Fixes

* **docs:** fix missing snippets in sample documentation ([af6e15a](https://www.github.com/googleapis/nodejs-bigtable/commit/af6e15a1df3106368efa8a7fb1f81f0eb8e8663f))

### [2.2.1](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.2.0...v2.2.1) (2019-10-22)


### Bug Fixes

* **deps:** bump google-gax to 1.7.5 ([#558](https://www.github.com/googleapis/nodejs-bigtable/issues/558)) ([02d48ee](https://www.github.com/googleapis/nodejs-bigtable/commit/02d48eee4a0f903abafb5f9f5a261bb06ab3b18c))

## [2.2.0](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.1.0...v2.2.0) (2019-10-09)


### Bug Fixes

* do not exclude d.ts files, and add install test ([#545](https://www.github.com/googleapis/nodejs-bigtable/issues/545)) ([60acdf8](https://www.github.com/googleapis/nodejs-bigtable/commit/60acdf8))
* use compatible version of google-gax ([588509b](https://www.github.com/googleapis/nodejs-bigtable/commit/588509b))


### Features

* .d.ts for protos ([#542](https://www.github.com/googleapis/nodejs-bigtable/issues/542)) ([3acf841](https://www.github.com/googleapis/nodejs-bigtable/commit/3acf841))

## [2.1.0](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.0.5...v2.1.0) (2019-09-09)


### Bug Fixes

* **deps:** update dependency yargs to v14 ([e0478d7](https://www.github.com/googleapis/nodejs-bigtable/commit/e0478d7))
* use correct version for x-goog-api-client ([#533](https://www.github.com/googleapis/nodejs-bigtable/issues/533)) ([1614e9e](https://www.github.com/googleapis/nodejs-bigtable/commit/1614e9e))


### Features

* load protos from JSON, grpc-fallback support, IAM protos ([#536](https://www.github.com/googleapis/nodejs-bigtable/issues/536)) ([04404a4](https://www.github.com/googleapis/nodejs-bigtable/commit/04404a4))

### [2.0.5](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.0.4...v2.0.5) (2019-08-13)


### Bug Fixes

* allow calls with no request, add JSON proto ([fb6ced6](https://www.github.com/googleapis/nodejs-bigtable/commit/fb6ced6))
* **deps:** use the latest extend ([#529](https://www.github.com/googleapis/nodejs-bigtable/issues/529)) ([7090c39](https://www.github.com/googleapis/nodejs-bigtable/commit/7090c39))
* **types:** Include TypeScript types with module ([#527](https://www.github.com/googleapis/nodejs-bigtable/issues/527)) ([cd9e517](https://www.github.com/googleapis/nodejs-bigtable/commit/cd9e517))

### [2.0.4](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.0.3...v2.0.4) (2019-08-01)


### Bug Fixes

* cancel streaming grpc request when user ends stream ([#507](https://www.github.com/googleapis/nodejs-bigtable/issues/507)) ([2b4297c](https://www.github.com/googleapis/nodejs-bigtable/commit/2b4297c))

### [2.0.3](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.0.2...v2.0.3) (2019-07-29)


### Bug Fixes

* **deps:** update dependency @google-cloud/paginator to v2 ([#513](https://www.github.com/googleapis/nodejs-bigtable/issues/513)) ([f4fdb7e](https://www.github.com/googleapis/nodejs-bigtable/commit/f4fdb7e))
* **deps:** update dependency google-auth-library to v5 ([#514](https://www.github.com/googleapis/nodejs-bigtable/issues/514)) ([b3ef8f1](https://www.github.com/googleapis/nodejs-bigtable/commit/b3ef8f1))
* **deps:** update dependency pumpify to v2 ([#515](https://www.github.com/googleapis/nodejs-bigtable/issues/515)) ([309e625](https://www.github.com/googleapis/nodejs-bigtable/commit/309e625))

### [2.0.2](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.0.1...v2.0.2) (2019-07-23)


### Bug Fixes

* modified timeout and retry parameters ([451bba9](https://www.github.com/googleapis/nodejs-bigtable/commit/451bba9))

### [2.0.1](https://www.github.com/googleapis/nodejs-bigtable/compare/v2.0.0...v2.0.1) (2019-06-26)


### Bug Fixes

* **docs:** link to reference docs section on googleapis.dev ([#502](https://www.github.com/googleapis/nodejs-bigtable/issues/502)) ([8b4a93e](https://www.github.com/googleapis/nodejs-bigtable/commit/8b4a93e))

## [2.0.0](https://www.github.com/googleapis/nodejs-bigtable/compare/v1.0.1...v2.0.0) (2019-06-24)


### ⚠ BREAKING CHANGES

* upgrade engines field to >=8.10.0 (#463)

### Bug Fixes

* **deps:** update dependency @google-cloud/common-grpc to v1 ([#478](https://www.github.com/googleapis/nodejs-bigtable/issues/478)) ([40197e4](https://www.github.com/googleapis/nodejs-bigtable/commit/40197e4))
* **deps:** update dependency @google-cloud/paginator to ^0.2.0 ([a25627c](https://www.github.com/googleapis/nodejs-bigtable/commit/a25627c)), closes [#8203](https://www.github.com/googleapis/nodejs-bigtable/issues/8203)
* **deps:** update dependency @google-cloud/paginator to v1 ([#468](https://www.github.com/googleapis/nodejs-bigtable/issues/468)) ([ae06ec2](https://www.github.com/googleapis/nodejs-bigtable/commit/ae06ec2))
* **deps:** update dependency @google-cloud/projectify to v1 ([#466](https://www.github.com/googleapis/nodejs-bigtable/issues/466)) ([6c6dd40](https://www.github.com/googleapis/nodejs-bigtable/commit/6c6dd40))
* **deps:** update dependency @google-cloud/promisify to ^0.4.0 ([#420](https://www.github.com/googleapis/nodejs-bigtable/issues/420)) ([d5c2862](https://www.github.com/googleapis/nodejs-bigtable/commit/d5c2862))
* **deps:** update dependency @google-cloud/promisify to v1 ([#467](https://www.github.com/googleapis/nodejs-bigtable/issues/467)) ([5473fb9](https://www.github.com/googleapis/nodejs-bigtable/commit/5473fb9))
* **deps:** update dependency arrify to v2 ([e29f9aa](https://www.github.com/googleapis/nodejs-bigtable/commit/e29f9aa))
* **deps:** update dependency dot-prop to v5 ([#455](https://www.github.com/googleapis/nodejs-bigtable/issues/455)) ([3949356](https://www.github.com/googleapis/nodejs-bigtable/commit/3949356))
* **deps:** update dependency escape-string-regexp to v2 ([#457](https://www.github.com/googleapis/nodejs-bigtable/issues/457)) ([d923b58](https://www.github.com/googleapis/nodejs-bigtable/commit/d923b58))
* **deps:** update dependency google-auth-library to v4 ([#475](https://www.github.com/googleapis/nodejs-bigtable/issues/475)) ([a58547c](https://www.github.com/googleapis/nodejs-bigtable/commit/a58547c))
* **deps:** update dependency google-gax to ^0.26.0 ([#461](https://www.github.com/googleapis/nodejs-bigtable/issues/461)) ([4462869](https://www.github.com/googleapis/nodejs-bigtable/commit/4462869))
* **deps:** update dependency google-gax to v1 ([#476](https://www.github.com/googleapis/nodejs-bigtable/issues/476)) ([adfeb9c](https://www.github.com/googleapis/nodejs-bigtable/commit/adfeb9c))
* **deps:** update dependency yargs to v13 ([#417](https://www.github.com/googleapis/nodejs-bigtable/issues/417)) ([fac8d4e](https://www.github.com/googleapis/nodejs-bigtable/commit/fac8d4e))
* "requires_billing " should be "requires_billing" ([#498](https://www.github.com/googleapis/nodejs-bigtable/issues/498)) ([c9f6f7e](https://www.github.com/googleapis/nodejs-bigtable/commit/c9f6f7e))
* DEADLINE_EXCEEDED is no longer retried ([c1190d3](https://www.github.com/googleapis/nodejs-bigtable/commit/c1190d3))
* DEADLINE_EXCEEDED retry code is idempotent ([#477](https://www.github.com/googleapis/nodejs-bigtable/issues/477)) ([2783944](https://www.github.com/googleapis/nodejs-bigtable/commit/2783944))
* throw on invalid credentials ([#418](https://www.github.com/googleapis/nodejs-bigtable/issues/418)) ([5b836fd](https://www.github.com/googleapis/nodejs-bigtable/commit/5b836fd))
* **docs:** move to new client docs URL ([#499](https://www.github.com/googleapis/nodejs-bigtable/issues/499)) ([acfe7c2](https://www.github.com/googleapis/nodejs-bigtable/commit/acfe7c2))


### Build System

* upgrade engines field to >=8.10.0 ([#463](https://www.github.com/googleapis/nodejs-bigtable/issues/463)) ([35cb71f](https://www.github.com/googleapis/nodejs-bigtable/commit/35cb71f))


### Features

* support apiEndpoint override ([#500](https://www.github.com/googleapis/nodejs-bigtable/issues/500)) ([89124f6](https://www.github.com/googleapis/nodejs-bigtable/commit/89124f6))
* update the admin APIs ([#485](https://www.github.com/googleapis/nodejs-bigtable/issues/485)) ([c76fba9](https://www.github.com/googleapis/nodejs-bigtable/commit/c76fba9))

## v1.0.1

01-29-2019 16:49 PST

### Bug Fixes
- fix: Prevent error when `decode: false` option is set in createReadStream. ([#403](https://github.com/googleapis/nodejs-bigtable/pull/403))

### Dependencies
- fix(deps): update dependency @google-cloud/common-grpc to ^0.10.0 ([#408](https://github.com/googleapis/nodejs-bigtable/pull/408))
- fix(deps): update dependency google-gax to ^0.24.0 ([#405](https://github.com/googleapis/nodejs-bigtable/pull/405))
- fix(deps): update dependency google-auth-library to v3 ([#402](https://github.com/googleapis/nodejs-bigtable/pull/402))
- fix(deps): update dependency concat-stream to v2 ([#396](https://github.com/googleapis/nodejs-bigtable/pull/396))

### Documentation
- refactor: modernize the samples a bit ([#398](https://github.com/googleapis/nodejs-bigtable/pull/398))
- docs: Added example region-tags for app-profile object ([#288](https://github.com/googleapis/nodejs-bigtable/pull/288))
- fix(docs): fix namespaces causing 404s ([#385](https://github.com/googleapis/nodejs-bigtable/pull/385))
- docs: update readme badges ([#379](https://github.com/googleapis/nodejs-bigtable/pull/379))

## v1.0.0

11-13-2018 08:31 PST


### Implementation Changes
- Empty column qualifiers are no longer rejected ([#353](https://github.com/googleapis/nodejs-bigtable/pull/353))

### Dependencies
- fix(deps): update dependency google-gax to ^0.22.0 ([#366](https://github.com/googleapis/nodejs-bigtable/pull/366))
- chore(deps): update dependency @google-cloud/nodejs-repo-tools to v3 ([#364](https://github.com/googleapis/nodejs-bigtable/pull/364))

### Documentation
- Added example region-tag for Family.js ([#262](https://github.com/googleapis/nodejs-bigtable/pull/262))
- Added example region-tags for cluster object ([#284](https://github.com/googleapis/nodejs-bigtable/pull/284))
- chore: drop contributors from multiple places ([#363](https://github.com/googleapis/nodejs-bigtable/pull/363))
- fix(samples): Fixing the Hello world ([#339](https://github.com/googleapis/nodejs-bigtable/pull/339))

### Internal / Testing Changes
- chore: update eslintignore config ([#365](https://github.com/googleapis/nodejs-bigtable/pull/365))
- refactor: use object.assign and drop lodash.flatten ([#362](https://github.com/googleapis/nodejs-bigtable/pull/362))
- chore: remove a few unused dependencies ([#358](https://github.com/googleapis/nodejs-bigtable/pull/358))
- chore: use latest npm on Windows ([#361](https://github.com/googleapis/nodejs-bigtable/pull/361))
- chore: fix and run the linter ([#357](https://github.com/googleapis/nodejs-bigtable/pull/357))
- fix(deps): update dependency through2 to v3 ([#359](https://github.com/googleapis/nodejs-bigtable/pull/359))
- Cleanup of `ChunkTransformer` ([#355](https://github.com/googleapis/nodejs-bigtable/pull/355))
- chore: update CircleCI config ([#352](https://github.com/googleapis/nodejs-bigtable/pull/352))
- chore: include build in eslintignore ([#349](https://github.com/googleapis/nodejs-bigtable/pull/349))
- chore(deps): update dependency eslint-plugin-node to v8 ([#345](https://github.com/googleapis/nodejs-bigtable/pull/345))
- chore: update issue templates ([#344](https://github.com/googleapis/nodejs-bigtable/pull/344))
- chore: remove old issue template ([#340](https://github.com/googleapis/nodejs-bigtable/pull/340))
- build: run tests on node11 ([#338](https://github.com/googleapis/nodejs-bigtable/pull/338))

## v0.16.1

### Dependencies
- fix(deps): update dependency @google-cloud/bigtable to ^0.16.0 ([#326](https://github.com/googleapis/nodejs-bigtable/pull/326))

### Documentation
- Clean up the "hello world" code sample ([#328](https://github.com/googleapis/nodejs-bigtable/pull/328))
- fix(docs): make Filter class public should it shows up in docs ([#331](https://github.com/googleapis/nodejs-bigtable/pull/331))

### Internal / Testing Changes
- chores(build): run codecov on continuous builds ([#334](https://github.com/googleapis/nodejs-bigtable/pull/334))
- chore: update new issue template ([#332](https://github.com/googleapis/nodejs-bigtable/pull/332))
- Fix some issues in the contributing instructions. ([#325](https://github.com/googleapis/nodejs-bigtable/pull/325))

## v0.16.0

### Implementation Changes
- Restricted combinations of row selection on read rows. ([#315](https://github.com/googleapis/nodejs-bigtable/pull/315))
- table.exists uses getTable with a Name only view for better perofrmance. ([#280](https://github.com/googleapis/nodejs-bigtable/pull/280))

### New Features
- Added Table.getReplicationStates ([#279](https://github.com/googleapis/nodejs-bigtable/pull/279))

### Dependencies
- chore(deps): update dependency sinon to v7 ([#321](https://github.com/googleapis/nodejs-bigtable/pull/321))
- chore(deps): update dependency eslint-plugin-prettier to v3 ([#317](https://github.com/googleapis/nodejs-bigtable/pull/317))
- fix(deps): update dependency @google-cloud/common-grpc to ^0.9.0 ([#307](https://github.com/googleapis/nodejs-bigtable/pull/307))
- fix(deps): update dependency google-gax to ^0.20.0 ([#302](https://github.com/googleapis/nodejs-bigtable/pull/302))
- chore(deps): update dependency nyc to v13 ([#285](https://github.com/googleapis/nodejs-bigtable/pull/285))
- fix(deps): update dependency @google-cloud/common-grpc to ^0.8.0 ([#289](https://github.com/googleapis/nodejs-bigtable/pull/289))
- fix(deps): update dependency google-auth-library to v2 ([#290](https://github.com/googleapis/nodejs-bigtable/pull/290))
- fix(deps): update dependency google-gax to ^0.19.0 ([#281](https://github.com/googleapis/nodejs-bigtable/pull/281))
- chore(deps): update dependency eslint-config-prettier to v3 ([#274](https://github.com/googleapis/nodejs-bigtable/pull/274))
- fix(deps): update dependency google-gax to ^0.18.0 ([#263](https://github.com/googleapis/nodejs-bigtable/pull/263))

### Documentation
- Added @example tags to src/table.js ([#239](https://github.com/googleapis/nodejs-bigtable/pull/239))
- Added example region-tags for row object ([#266](https://github.com/googleapis/nodejs-bigtable/pull/266))
- documentation update for getTables ([#311](https://github.com/googleapis/nodejs-bigtable/pull/311))
- move instance snippet tests to document-snippets/tests ([#308](https://github.com/googleapis/nodejs-bigtable/pull/308))
- Added @example tags to src/instance.js ([#222](https://github.com/googleapis/nodejs-bigtable/pull/222)) ([#252](https://github.com/googleapis/nodejs-bigtable/pull/252))

### Internal / Testing Changes
- build: fix codecov uploading on Kokoro ([#323](https://github.com/googleapis/nodejs-bigtable/pull/323))
- test: System test fix ([#322](https://github.com/googleapis/nodejs-bigtable/pull/322))
- Update kokoro config ([#318](https://github.com/googleapis/nodejs-bigtable/pull/318))
- build: prevent system/sample-test from leaking credentials
- Update the kokoro config ([#313](https://github.com/googleapis/nodejs-bigtable/pull/313))
- test: remove appveyor config ([#312](https://github.com/googleapis/nodejs-bigtable/pull/312))
- Update the CI config ([#310](https://github.com/googleapis/nodejs-bigtable/pull/310))
- Fix the linter ([#306](https://github.com/googleapis/nodejs-bigtable/pull/306))
- Enable prefer-const in the eslint config ([#305](https://github.com/googleapis/nodejs-bigtable/pull/305))
- Enable no-var in eslint ([#304](https://github.com/googleapis/nodejs-bigtable/pull/304))
- Re-generate library using /synth.py ([#303](https://github.com/googleapis/nodejs-bigtable/pull/303))
- test: throw on deprecation ([#264](https://github.com/googleapis/nodejs-bigtable/pull/264))
- Update CI config ([#300](https://github.com/googleapis/nodejs-bigtable/pull/300))
- Split usage of common module ([#297](https://github.com/googleapis/nodejs-bigtable/pull/297))
- Retry npm install in CI ([#295](https://github.com/googleapis/nodejs-bigtable/pull/295))
- Re-generate library using /synth.py ([#292](https://github.com/googleapis/nodejs-bigtable/pull/292))
- Re-generate library using /synth.py ([#287](https://github.com/googleapis/nodejs-bigtable/pull/287))
- Update the CI config ([#283](https://github.com/googleapis/nodejs-bigtable/pull/283))
- Update synth.py ([#276](https://github.com/googleapis/nodejs-bigtable/pull/276))
- chore: make the CircleCI config consistent ([#282](https://github.com/googleapis/nodejs-bigtable/pull/282))
- Re-generate library using /synth.py ([#277](https://github.com/googleapis/nodejs-bigtable/pull/277))
- build: add repo_name to synth.py ([#275](https://github.com/googleapis/nodejs-bigtable/pull/275))
- chore: run prettier for auto-generated code ([#273](https://github.com/googleapis/nodejs-bigtable/pull/273))
- chore: do not use npm ci ([#272](https://github.com/googleapis/nodejs-bigtable/pull/272))
- Re-generate library using /synth.py ([#270](https://github.com/googleapis/nodejs-bigtable/pull/270))
- chore: ignore package-lock.json ([#269](https://github.com/googleapis/nodejs-bigtable/pull/269))
- chore(deps): lock file maintenance ([#268](https://github.com/googleapis/nodejs-bigtable/pull/268))
- chore(deps): lock file maintenance ([#267](https://github.com/googleapis/nodejs-bigtable/pull/267))
- chore: update renovate config ([#265](https://github.com/googleapis/nodejs-bigtable/pull/265))
- chore(deps): lock file maintenance ([#261](https://github.com/googleapis/nodejs-bigtable/pull/261))
- Use assert.deepStrictEqual instead of deepEqual. ([#253](https://github.com/googleapis/nodejs-bigtable/pull/253))
- test: use strictEqual in tests ([#250](https://github.com/googleapis/nodejs-bigtable/pull/250))
