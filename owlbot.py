# Copyright 2021 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
import synthtool as s
import synthtool.gcp as gcp
import synthtool.languages.node as node
import logging
import os
from pathlib import Path
from synthtool import _tracked_paths
import shutil

logging.basicConfig(level=logging.DEBUG)

staging = Path("owl-bot-staging")

if staging.is_dir():
    logging.info(f"Copying files from staging directory ${staging}.")


    # Copy bigtable library.
    # src/index.ts src/v2/index.ts has added AdminClients manually, we don't wanna override it.
    # src/*.ts is a added layer for the client libraries, they need extra setting in tsconfig.json & tslint.json
    # Tracking issues: 1. https://github.com/googleapis/nodejs-bigtable/issues/636
    #                  2. https://github.com/googleapis/nodejs-bigtable/issues/635
    for version in ['v2']:
        library = staging / version
        _tracked_paths.add(library)
        s.copy([library], excludes=['package.json', 'README.md', 'src/index.ts', 'src/v2/index.ts', 'tsconfig.json', 'tslint.json'])

    # Copy the admin library.
    # Not override system-test for admin/v2, just keep the v2 version.
    for version in ['v2']:
        library = staging / 'admin' / version
        _tracked_paths.add(library)
        s.copy([library], excludes=['package.json', 'README.md', 'src/index.ts', 'src/v2/index.ts', 'tsconfig.json', 'tslint.json', 'system-test/fixtures/sample/src/index.ts', 'system-test/fixtures/sample/src/index.js'])

    # Replace the client name for generated system-test.
    system_test_files=['system-test/fixtures/sample/src/index.ts','system-test/fixtures/sample/src/index.js']
    for file in system_test_files:
        s.replace(file, 'BigtableClient', 'Bigtable')
        s.replace(file, 'client.close', '// client.close') # this does not work with the manual layer
        s.replace(file, 'function doStuffWith', '// eslint-disable-next-line @typescript-eslint/no-unused-vars\nfunction doStuffWith')

    # The staging directory should never be merged into the main branch.
    shutil.rmtree(staging)

common_templates = gcp.CommonTemplates()
templates = common_templates.node_library(
  source_location='build/src'
)
s.copy(templates,excludes=[
  '.github/auto-approve.yml'
])

node.postprocess_gapic_library_hermetic()
