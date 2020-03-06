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

s.copy(
  v2_library,
  excludes=['package.json', 'README.md', 'src/index.ts', 'src/v2/index.ts']
)

v2_library = gapic.typescript_library(
    "bigtable_admin",
    "v2",
    generator_args={
      "grpc-service-config": f"google/bigtable/admin/{version}/bigtableadmin_grpc_service_config.json",
      "main-service": f"bigtable"
      },
      proto_path=f'/google/bigtable/admin/{version}',
      extra_proto_files=['google/cloud/common_resources.proto'],
      )
s.copy(
  v2_library,
  excludes=['package.json', 'README.md', 'src/index.ts', 'src/v2/index.ts']
)

# Update path discovery due to build/ dir and TypeScript conversion.
# s.replace("src/v2/bigtable_client.js", "../../package.json", "../../../package.json")
# s.replace("src/v2/bigtable_instance_admin_client.js", "../../package.json", "../../../package.json")
# s.replace("src/v2/bigtable_table_admin_client.js", "../../package.json", "../../../package.json")


common_templates = gcp.CommonTemplates()
templates = common_templates.node_library(
  source_location='build/src'
)
s.copy(templates)

subprocess.run(['npm', 'install'])
subprocess.run(['npm', 'run', 'fix'])
subprocess.run(['npx', 'compileProtos', 'src'])
