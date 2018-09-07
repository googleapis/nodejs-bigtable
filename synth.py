import synthtool as s
import synthtool.gcp as gcp
import logging
import subprocess

logging.basicConfig(level=logging.DEBUG)

gapic = gcp.GAPICGenerator()
v2_library = gapic.node_library(
    'bigtable', 'v2', config_path='/google/bigtable/artman_bigtable.yaml')
s.copy(
    v2_library,
    excludes=['package.json', 'README.md', 'src/index.js', 'src/v2/index.js'])

common_templates = gcp.CommonTemplates()
templates = common_templates.node_library()
s.copy(templates)

subprocess.run(['npm', 'install'])
subprocess.run(['npm', 'run', 'prettier'])
