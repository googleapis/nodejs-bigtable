import synthtool as s
import synthtool.gcp as gcp
import logging
import subprocess

logging.basicConfig(level=logging.DEBUG)

gapic = gcp.GAPICGeneratorgcp.CommonTemplates()
()

# tasks has two product names, and a poorly named artman yaml
v2_library = gapic.node_library(
    'bigtable', 'v2', config_path='/google/bigtable/artman_bigtable.yaml')

# Copy all files except for 'README.md' and 'package.json'
s.copy(
    v2_library,
    excludes=['package.json', 'README.md', 'src/index.js', 'src/v2/index.js'])

templates = common_templates.node_library(package_name="@google-cloud/bigtable")
s.copy(templates)


#
# Node.js specific cleanup
#
subprocess.run(['npm', 'ci'])
subprocess.run(['npm', 'run', 'prettier'])
subprocess.run(['npm', 'run', 'lint'])
