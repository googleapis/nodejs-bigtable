import synthtool as s
import synthtool.gcp as gcp
import logging
import subprocess

logging.basicConfig(level=logging.DEBUG)

gapic = gcp.GAPICGenerator()
common_templates = gcp.CommonTemplates()

v2_library = gapic.node_library(
    'bigtable', 'v2', config_path='/google/bigtable/artman_bigtable.yaml')

# Copy all files except for 'README.md' and 'package.json'
s.copy(
    v2_library,
    excludes=['package.json', 'README.md', 'src/index.js', 'src/v2/index.js'])

templates = common_templates.node_library(
    package_name="@google-cloud/bigtable",
    repo_name="googleapis/nodejs-bigtable")
s.copy(templates)

#
# Node.js specific cleanup
#
subprocess.run(['npm', 'install'])
subprocess.run(['npm', 'run', 'prettier'])
subprocess.run(['npm', 'run', 'lint'])
