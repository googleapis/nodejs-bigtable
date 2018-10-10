# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/@google-cloud/bigtable?activeTab=versions

## v0.16.0

### Implementation Changes
- Restricted combinations of row selection on read rows. ([#315](https://github.com/googleapis/nodejs-bigtable/pull/315))
- table.exists uses getTable with a Name only view for better perofrmance. ([#280](https://github.com/googleapis/nodejs-bigtable/pull/280))

### New Features
- Added Table.getReplicationStates ([#279](https://github.com/googleapis/nodejs-bigtable/pull/279))

### Dependencies
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
- Added example region-tags for row object ([#266](https://github.com/googleapis/nodejs-bigtable/pull/266))
- documentation update for getTables ([#311](https://github.com/googleapis/nodejs-bigtable/pull/311))
- move instance snippet tests to document-snippets/tests ([#308](https://github.com/googleapis/nodejs-bigtable/pull/308))
- Added @example tags to src/instance.js ([#222](https://github.com/googleapis/nodejs-bigtable/pull/222)) ([#252](https://github.com/googleapis/nodejs-bigtable/pull/252))

### Internal / Testing Changes
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

