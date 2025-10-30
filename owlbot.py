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
from typing import AnyStr
import shutil

logging.basicConfig(level=logging.DEBUG)

staging = Path("owl-bot-staging")

if staging.is_dir():
    versions = ['v2']
    versions_admin = [f"admin/{p}" for p in versions]

    logging.info(f"Copying files from staging directory {staging}.")

    src_paths = {}
    src_files = {}
    for version in versions + versions_admin:
        src_paths[version] = staging / version
        src_files[version] = list([fn for fn in src_paths[version].glob('**/*.*')])

    # Copy bigtable library.
    # src/index.ts src/admin/v2/index.ts has added AdminClients manually, we don't wanna override it.
    # src/*.ts is a added layer for the client libraries, they need extra setting in tsconfig.json & tslint.json
    # Tracking issues: 1. https://github.com/googleapis/nodejs-bigtable/issues/636
    #                  2. https://github.com/googleapis/nodejs-bigtable/issues/635
    for version in versions:
        library = src_paths[version]
        _tracked_paths.add(library)
        admin_files = filter(
            lambda f: str(f).find('_admin') >= 0,
            src_files[version]
        )
        excludes = [
            'package.json',
            'README.md',
            'src/index.ts',
            'src/v2/index.ts',
            'tsconfig.json',
            'tslint.json',
            '.github/sync-repo-settings.yaml',
            '.OwlBot.yaml',
        ] + list(admin_files)
        logging.info(f"excluding files for non-admin: {excludes}")
        s.copy([library], excludes = excludes)

    # Copy the admin library pieces and knit them in.
    # Don't override system-test for admin/v2, just keep the v2 version.
    for version in versions:
        admin_version = f"admin/{version}"
        library = src_paths[admin_version]
        inProtoPath = f"protos/google/bigtable/{admin_version}"
        protos = library / inProtoPath
        classes = library / 'src' / version
        samples = library / 'samples' / 'generated'
        tests = library / 'test'
        _tracked_paths.add(library)

        # We also have to munge the proto paths in the *_proto_list.json due to making it a level deeper.
        # That also applies to the classes themselves.
        classesStr = str(classes)
        jsons = [fn
                    for fn
                    in src_files[admin_version]
                    if str(fn)[:len(classesStr)] == classesStr]
        for jfn in jsons:
            logging.info(f"munging json file: {str(jfn)}")
            contents = jfn.read_text()
            contents = contents.replace("'../..", "'../../..")
            contents = contents.replace('"../..', '"../../..')
            jfn.write_text(contents)

        # Also to the tests that import stuff from src. ../ -> ../../../
        testsStr = str(tests)
        tfns = [fn
                    for fn
                    in src_files[admin_version]
                    if str(fn)[:len(testsStr)] == testsStr]
        for tfn in tfns:
            logging.info(f"munging test file: {str(tfn)}")
            contents = tfn.read_text()
            contents = contents.replace("'../", "'../../../")
            tfn.write_text(contents)

        # Finally, the samples. .v2 -> .admin.v2
        samplesStr = str(samples)
        sfns = [fn
                    for fn
                    in src_files[admin_version]
                    if str(fn)[:len(samplesStr)] == samplesStr]
        for sfn in sfns:
            logging.info(f"munging sample file: {str(sfn)}")
            contents = sfn.read_text()
            contents = contents.replace(').v2', ').admin.v2')
            sfn.write_text(contents)

        os.system(f"mkdir -p {inProtoPath}")
        s.copy([protos / '*'], destination=inProtoPath)
        os.system(f"mkdir -p src/{admin_version}")
        s.copy([classes / '*'], destination=f"src/{admin_version}")
        os.system(f"mkdir -p samples/generated/{admin_version}")
        s.copy([samples / 'v2' / '*admin*'], destination=f"samples/generated/{admin_version}")
        os.system(f"mkdir -p test/{admin_version}")
        s.copy([tests / '*admin*.ts'], destination=f"test/{admin_version}")

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
  '.github/auto-approve.yml',
  '.github/sync-repo-settings.yaml'
])

node.postprocess_gapic_library_hermetic()
