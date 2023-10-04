#!/bin/bash

# Copyright 2023 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

echo "test1"

set -eo pipefail

echo "test2"

export NPM_CONFIG_PREFIX=${HOME}/.npm-global

## cd to the parent directory, i.e. the root of the git repo
cd $(dirname $0)/..

echo "test3"

# Build and start the proxy in a separate process
pushd .
npm install
nohup npm run testproxy &
proxyPID=$!
echo "test32"
popd

echo "test4"

# Run the conformance test
pushd .
pwd
ls
cd cloud-bigtable-clients-test/tests
eval "go test -v -proxy_addr=:9999 -skip ${`cat ../../testproxy/known_failures.txt`[@]}"
RETURN_CODE=$?
popd

echo "test5"

# Stop the proxy
kill $proxyPID

echo "test6"

# fix output location of logs
bash .kokoro/coerce_logs.sh

echo "test7"

echo "exiting with ${RETURN_CODE}"
exit ${RETURN_CODE}