# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/@google-cloud/bigtable?activeTab=versions

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

