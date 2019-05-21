import synthtool as s
import synthtool.gcp as gcp
import logging
import subprocess

logging.basicConfig(level=logging.DEBUG)

gapic = gcp.GAPICGenerator()
v2_library = gapic.node_library(
  'bigtable',
  'v2',
  config_path='/google/bigtable/artman_bigtable.yaml'
)

s.copy(
  v2_library,
  excludes=['package.json', 'README.md', 'src/index.js', 'src/v2/index.js']
)

v2_library = gapic.node_library(
    "bigtable_admin",
    "v2",
    config_path="/google/bigtable/admin/artman_bigtableadmin.yaml",
    artman_output_name="bigtable-admin-v2"
)

s.copy(
  v2_library,
  excludes=['package.json', 'README.md', 'src/index.js', 'src/v2/index.js']
)

# Update path discovery due to build/ dir and TypeScript conversion.
s.replace("src/v2/bigtable_client.js", "../../package.json", "../../../package.json")
s.replace("src/v2/bigtable_instance_admin_client.js", "../../package.json", "../../../package.json")
s.replace("src/v2/bigtable_table_admin_client.js", "../../package.json", "../../../package.json")

common_templates = gcp.CommonTemplates()
templates = common_templates.node_library(
  source_location='build/src'
)
s.copy(templates)

subprocess.run(['npm', 'install'])
subprocess.run(['npm', 'run', 'fix'])
