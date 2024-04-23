'use strict'

const fs = require('fs')
const path = require('path')
const debug = require('debug')('snap-shot-core')
const verbose = require('debug')('snap-shot-core:verbose')
const la = require('lazy-ass')
const is = require('check-more-types')
const mkdirp = require('mkdirp')
const vm = require('vm')
const escapeQuotes = require('escape-quotes')
const pluralize = require('pluralize')

const removeExtraNewLines = require('./utils').removeExtraNewLines
const exportText = require('./utils').exportText
const exportObject = require('./utils').exportObject

/**
 * Saved original process current working directory (absolute path).
 * We want to save it right away, because during testing CWD often changes,
 * and we don't want the snapshots to randomly "jump" around and be
 * saved in an unexpected location.
 */
const cwd = process.cwd()
/**
 * Returns a relative path to the original working directory.
 */
const fromCurrentFolder = path.relative.bind(null, cwd)
const snapshotsFolderName = '__snapshots__'
/**
 * Given relative path, returns same relative path, but inside
 * the snapshots folder.
 * @example
 *  joinSnapshotsFolder('foo/bar')
 *  // CWD/__snapshots__/foo/bar
 */
const joinSnapshotsFolder = path.join.bind(null, cwd, snapshotsFolderName)

// TODO: expose the name of the snapshots folder to the outside world id:16
// - <https://github.com/bahmutov/snap-shot-core/issues/245>
// Gleb Bahmutov
// gleb.bahmutov@gmail.com
const snapshotsFolder = fromCurrentFolder(snapshotsFolderName)
debug('process cwd: %s', cwd)
debug('snapshots folder: %s', snapshotsFolder)

/**
 * Changes from relative path to absolute filename with respect to the
 * _original working directory_. Always use this function instead of
 * `path.resolve(filename)` because `path.resolve` will be affected
 * by the _current_ working directory at the moment of resolution, and
 * we want to form snapshot filenames wrt to the original starting
 * working directory.
 */
const resolveToCwd = path.resolve.bind(null, cwd)

const isSaveOptions = is.schema({
  sortSnapshots: is.bool
})

const isLoadOptions = is.schema({
  useRelativePath: is.bool
})

function getSnapshotsFolder (specFile, opts = { useRelativePath: false }) {
  if (!opts.useRelativePath) {
    // all snapshots go into the same folder
    return snapshotsFolder
  }

  const relativeDir = fromCurrentFolder(path.dirname(specFile))
  verbose('relative path to spec file %s is %s', specFile, relativeDir)

  // return path.join(resolveToCwd(relativeDir), '__snapshots__')
  const folder = joinSnapshotsFolder(relativeDir)
  verbose('snapshot folder %s', folder)

  return folder
}

function loadSnaps (snapshotPath) {
  const full = require.resolve(snapshotPath)
  if (!fs.existsSync(snapshotPath)) {
    return {}
  }

  const sandbox = {
    exports: {}
  }
  const source = fs.readFileSync(full, 'utf8')
  try {
    vm.runInNewContext(source, sandbox)
    return removeExtraNewLines(sandbox.exports)
  } catch (e) {
    console.error('Could not load file', full)
    console.error(source)
    console.error(e)
    if (e instanceof SyntaxError) {
      throw e
    }
    return {}
  }
}

function fileForSpec (specFile, ext, opts = { useRelativePath: false }) {
  la(is.unemptyString(specFile), 'missing spec file', specFile)
  la(is.maybe.string(ext), 'invalid extension to find', ext)
  la(isLoadOptions(opts), 'expected fileForSpec options', opts)

  const specName = path.basename(specFile)
  la(
    is.unemptyString(specName),
    'could not get spec name from spec file',
    specFile
  )

  const snapshotFolder = getSnapshotsFolder(specFile, opts)

  verbose(
    'spec file "%s" has name "%s" and snapshot folder %s',
    specFile,
    specName,
    snapshotFolder
  )

  let filename = path.join(snapshotFolder, specName)
  if (ext) {
    if (!filename.endsWith(ext)) {
      filename += ext
    }
  }
  verbose('formed filename %s', filename)
  const fullName = resolveToCwd(filename)
  verbose('full resolved name %s', fullName)

  return fullName
}

function loadSnapshotsFrom (filename) {
  la(is.unemptyString(filename), 'missing snapshots filename', filename)

  debug('loading snapshots from %s', filename)
  let snapshots = {}
  if (fs.existsSync(filename)) {
    snapshots = loadSnaps(filename)
  } else {
    debug('could not find snapshots file %s', filename)
  }
  return snapshots
}

function loadSnapshots (specFile, ext, opts = { useRelativePath: false }) {
  la(is.unemptyString(specFile), 'missing specFile name', specFile)
  la(isLoadOptions(opts), 'expected loadSnapshots options', opts)

  const filename = fileForSpec(specFile, ext, opts)
  verbose('from spec %s got snap filename %s', specFile, filename)
  return loadSnapshotsFrom(filename)
}

function prepareFragments (snapshots, opts = { sortSnapshots: true }) {
  la(isSaveOptions(opts), 'expected prepare fragments options', opts)

  const keys = Object.keys(snapshots)
  debug(
    'prepare %s, sorted? %d',
    pluralize('snapshot', keys.length, true),
    opts.sortSnapshots
  )
  const names = opts.sortSnapshots ? keys.sort() : keys

  const fragments = names.map(testName => {
    debug(`snapshot fragment name "${testName}"`)
    const value = snapshots[testName]
    const escapedName = escapeQuotes(testName)
    return is.string(value)
      ? exportText(escapedName, value)
      : exportObject(escapedName, value)
  })

  return fragments
}

function maybeSortAndSave (snapshots, filename, opts = { sortSnapshots: true }) {
  const fragments = prepareFragments(snapshots, opts)
  debug('have %s', pluralize('fragment', fragments.length, true))

  const s = fragments.join('\n')
  fs.writeFileSync(filename, s, 'utf8')
  return s
}

// returns snapshot text
function saveSnapshots (
  specFile,
  snapshots,
  ext,
  opts = { sortSnapshots: true, useRelativePath: false }
) {
  la(
    isSaveOptions(opts) && isLoadOptions(opts),
    'expected save snapshots options',
    opts
  )

  const snapshotsFolder = getSnapshotsFolder(specFile, opts)
  debug('for spec file %s', specFile)
  debug('making folder "%s" for snapshot if does not exist', snapshotsFolder)

  mkdirp.sync(snapshotsFolder)
  const filename = fileForSpec(specFile, ext, opts)
  const specRelativeName = fromCurrentFolder(specFile)
  debug('saving snapshots into %s for %s', filename, specRelativeName)
  debug('snapshots are')
  debug(snapshots)
  debug('saveSnapshots options %o', opts)

  return maybeSortAndSave(snapshots, filename, opts)
}

const isValidCompareResult = is.schema({
  orElse: is.fn
})

/**
 * Throws error if two values are different.
 *
 * value - what the test computed right now
 * expected - existing value loaded from snapshot
 */
function raiseIfDifferent (options) {
  options = options || {}

  const value = options.value
  const expected = options.expected
  const specName = options.specName
  const compare = options.compare

  la(value, 'missing value to compare', value)
  la(expected, 'missing expected value', expected)
  la(is.unemptyString(specName), 'missing spec name', specName)

  const result = compare({ expected, value })
  la(
    isValidCompareResult(result),
    'invalid compare result',
    result,
    'when comparing value\n',
    value,
    'with expected\n',
    expected
  )

  result.orElse(message => {
    debug('Test "%s" snapshot difference', specName)
    la(is.unemptyString(message), 'missing err string', message)

    const fullMessage = `Different value of snapshot "${specName}"\n${message}`

    // QUESTION should we print the error message by default?
    console.error(fullMessage)

    throw new Error(fullMessage)
  })
}

module.exports = {
  readFileSync: fs.readFileSync,
  fromCurrentFolder,
  loadSnapshots,
  loadSnapshotsFrom,
  saveSnapshots,
  maybeSortAndSave,
  raiseIfDifferent,
  fileForSpec,
  exportText,
  prepareFragments,
  joinSnapshotsFolder,
  snapshotsFolderName
}
