/**
 * Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const async = require('async');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const pnaDirectories = glob.sync('./**/process-nextick-args');
async.each(pnaDirectories, patchPnaDirectory, function(err) {
  if (err) throw err;
  console.log('Patching complete.');
});

function copyFile(from, to, callback) {
  fs
    .createReadStream(from)
    .on('error', callback)
    .pipe(fs.createWriteStream(to))
    .on('error', callback)
    .on('finish', callback);
}

function patchPnaDirectory(pnaDirectoryPath, callback) {
  const packageJson = require(path.join(
    '../',
    pnaDirectoryPath,
    'package.json'
  ));
  const majorVersion = parseInt(packageJson.version[0], 10);

  if (majorVersion < 2) {
    copyFile(
      path.join(__dirname, 'patched-process-nextick-args-v1.js'),
      path.join(pnaDirectoryPath, 'index.js'),
      callback
    );
  } else {
    copyFile(
      path.join(__dirname, 'patched-process-nextick-args-v2.js'),
      path.join(pnaDirectoryPath, 'index.js'),
      callback
    );
  }
}
