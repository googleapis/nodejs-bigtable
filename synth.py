import synthtool as s
import synthtool.gcp as gcp
import logging
import subprocess
import os

logging.basicConfig(level=logging.DEBUG)
version='v2'
gapic = gcp.GAPICMicrogenerator()
v2_library = gapic.typescript_library(
  'bigtable',
  'v2',
  generator_args={
    "grpc-service-config": f"google/bigtable/{version}/bigtable_grpc_service_config.json",
    "package-name": f"@google-cloud/bigtable",
    "main-service": f"bigtable"
    },
    proto_path=f'/google/bigtable/{version}',
    extra_proto_files=['google/cloud/common_resources.proto'],
  )
# src/index.ts src/v2/index.ts has added AdminClients manually, we don't wanna override it.
# src/*.ts is a added layer for the client libraries, they need extra setting in tsconfig.json & tslint.json
# Tracking issues: 1. https://github.com/googleapis/nodejs-bigtable/issues/636
#                  2. https://github.com/googleapis/nodejs-bigtable/issues/635
s.copy(
  v2_library,
  excludes=['package.json', 'README.md', 'src/index.ts', 'src/v2/index.ts', 'tsconfig.json', 'tslint.json']
)

v2_library = gapic.typescript_library(
    "bigtable_admin",
    "v2",
    generator_args={
      "grpc-service-config": f"google/bigtable/admin/{version}/bigtableadmin_grpc_service_config.json",
      "package-name": f"@google-cloud/bigtable",
      "main-service": f"bigtable"
      },
      proto_path=f'/google/bigtable/admin/{version}',
      extra_proto_files=['google/cloud/common_resources.proto'],
      )
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

subprocess.run(['npm', 'install'])
subprocess.run(['npm', 'run', 'fix'])
subprocess.run(['npx', 'compileProtos', 'src'])
