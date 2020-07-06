import synthtool as s
import synthtool.gcp as gcp
import synthtool.languages.node as node
import logging
import os

logging.basicConfig(level=logging.DEBUG)

AUTOSYNTH_MULTIPLE_COMMITS = True

version='v2'
gapic = gcp.GAPICBazel()
v2_library = gapic.node_library('bigtable', version, proto_path=f'google/bigtable/{version}')
# src/index.ts src/v2/index.ts has added AdminClients manually, we don't wanna override it.
# src/*.ts is a added layer for the client libraries, they need extra setting in tsconfig.json & tslint.json
# Tracking issues: 1. https://github.com/googleapis/nodejs-bigtable/issues/636
#                  2. https://github.com/googleapis/nodejs-bigtable/issues/635
s.copy(
  v2_library,
  excludes=['package.json', 'README.md', 'src/index.ts', 'src/v2/index.ts', 'tsconfig.json', 'tslint.json']
)

v2_library = gapic.node_library("bigtable-admin", version, proto_path=f'google/bigtable/admin/{version}')
# Not override system-test for admin/v2, just keep the v2 version.
s.copy(
  v2_library,
  excludes=['package.json', 'README.md', 'src/index.ts', 'src/v2/index.ts', 'tsconfig.json', 'tslint.json', 'system-test/fixtures/sample/src/index.ts', 'system-test/fixtures/sample/src/index.js']
)
# Replace the client name for generated system-test.
system_test_files=['system-test/fixtures/sample/src/index.ts','system-test/fixtures/sample/src/index.js']
for file in system_test_files:
    s.replace(file, 'BigtableClient', 'Bigtable')
common_templates = gcp.CommonTemplates()
templates = common_templates.node_library(
  source_location='build/src'
)
s.copy(templates)

node.postprocess_gapic_library()
