const fs = require('fs');
const glob = require('glob');
const path = require('path');

const patchedV1 = `${__dirname}/patched-process-nextick-args-v1.js`;
const patchedV2 = `${__dirname}/patched-process-nextick-args-v2.js`;
glob.sync('./**/process-nextick-args').forEach(pnaDirectoryPath => {
  const packageJson = require(path.join('../', pnaDirectoryPath, 'package.json'));
  const majorVersion = parseInt(packageJson.version[0], 10);

  if (majorVersion <= 1) {
    fs.copyFileSync(patchedV1, path.join(pnaDirectoryPath, 'index.js'));
  } else {
    fs.copyFileSync(patchedV2, path.join(pnaDirectoryPath, 'index.js'));
  }
});