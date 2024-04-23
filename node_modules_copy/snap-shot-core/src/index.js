'use strict'

const debug = require('debug')('snap-shot-core')
const debugSave = require('debug')('save')
const la = require('lazy-ass')
const is = require('check-more-types')
const utils = require('./utils')
const isCI = require('is-ci')
const quote = require('quote')
const R = require('ramda')

const snapshotIndex = utils.snapshotIndex
const strip = utils.strip

const isNode = Boolean(require('fs').existsSync)
const isBrowser = !isNode
const isCypress = isBrowser && typeof cy === 'object'

if (isNode) {
  debug('snap-shot-core v%s', require('../package.json').version)
}

const identity = x => x

// TODO do we still need this? Is this working? id:4
// Gleb Bahmutov
// gleb.bahmutov@gmail.com
// https://github.com/bahmutov/snap-shot-core/issues/89
let fs
if (isNode) {
  fs = require('./file-system')
} else if (isCypress) {
  fs = require('./cypress-system')
} else {
  fs = require('./browser-system')
}

// keeps track how many "snapshot" calls were there per test
var snapshotsPerTest = {}

/**
 * Forms unique long name for a snapshot
 * @param {string} specName
 * @param {number} oneIndex
 */
const formKey = (specName, oneIndex) => `${specName} ${oneIndex}`

const haveNameParameters = is.schema({
  exactSpecName: is.maybe.unemptyString,
  specName: is.maybe.unemptyString,
  index: is.maybe.number
})

/**
 * Returns the name of the snapshot when it is saved.
 * Could be either an exact string or a combination of the spec name and index
 */
const savedSnapshotName = (options = {}) => {
  la(haveNameParameters(options), 'cannot compute snapshot key from', options)
  const { exactSpecName, specName, index } = options
  return exactSpecName || formKey(specName, index)
}

function restore (options) {
  if (!options) {
    debug('restoring all counters')
    snapshotsPerTest = {}
  } else {
    const file = options.file
    const specName = options.specName
    la(is.unemptyString(file), 'missing file', options)
    la(is.unemptyString(specName), 'missing specName', options)
    debug('restoring counter for file "%s" test "%s"', file, specName)
    delete snapshotsPerTest[specName]
  }
}

function findStoredValue (options) {
  const file = options.file
  const specName = options.specName
  const exactSpecName = options.exactSpecName
  const ext = options.ext
  let index = options.index
  let opts = options.opts

  if (index === undefined) {
    index = 1
  }
  if (opts === undefined) {
    opts = {}
  }

  la(is.unemptyString(file), 'missing file to find spec for', file)
  const relativePath = fs.fromCurrentFolder(file)
  if (opts.update) {
    // let the new value replace the current value
    return
  }

  debug(
    'loading snapshots for file %s ext %s from path %s (relative to CWD)',
    file,
    ext,
    relativePath
  )
  const loadOptions = R.pick(['useRelativePath'], opts)
  debug('load options %o', loadOptions)

  const snapshots = fs.loadSnapshots(file, ext, loadOptions)
  if (!snapshots) {
    debug('could not find any snapshots')
    return
  }

  const key = savedSnapshotName({ exactSpecName, specName, index })
  debug('key "%s"', key)
  if (!(key in snapshots)) {
    return
  }

  return snapshots[key]
}

/**
 * Stores new snapshot value if possible.
 * Returns the key for the value
 */
function storeValue (options) {
  const file = options.file
  const specName = options.specName
  const exactSpecName = options.exactSpecName
  const index = options.index
  const value = options.value
  const ext = options.ext
  const comment = options.comment
  let opts = options.opts

  if (opts === undefined) {
    opts = {}
  }

  la(value !== undefined, 'cannot store undefined value')
  la(is.unemptyString(file), 'missing filename', file)

  la(
    is.unemptyString(specName) || is.unemptyString(exactSpecName),
    'missing spec or exact spec name',
    specName,
    exactSpecName
  )

  if (!exactSpecName) {
    la(
      is.maybe.positive(index),
      'missing snapshot index',
      file,
      specName,
      index
    )
  }
  la(is.maybe.unemptyString(comment), 'invalid comment to store', comment)

  // how to serialize comments?
  // as comments above each key?
  const snapshots = fs.loadSnapshots(
    file,
    ext,
    R.pick(['useRelativePath'], opts)
  )
  const key = savedSnapshotName({ exactSpecName, specName, index })
  snapshots[key] = value

  if (opts.show || opts.dryRun) {
    const relativeName = fs.fromCurrentFolder(file)
    console.log('saving snapshot "%s" for file %s', key, relativeName)
    console.log(value)
  }

  if (!opts.dryRun) {
    fs.saveSnapshots(
      file,
      snapshots,
      ext,
      R.pick(['sortSnapshots', 'useRelativePath'], opts)
    )
    debug('saved updated snapshot %d for spec "%s"', index, specName)

    debugSave(
      'Saved for "%s %d" snapshot\n%s',
      specName,
      index,
      JSON.stringify(value, null, 2)
    )
  }

  return key
}

const isPromise = x => is.object(x) && is.fn(x.then)

function throwCannotSaveOnCI ({
  value,
  fileParameter,
  exactSpecName,
  specName,
  index
}) {
  const key = savedSnapshotName({ exactSpecName, specName, index })
  throw new Error(
    'Cannot store new snapshot value\n' +
      'in ' +
      quote(fileParameter) +
      '\n' +
      'for snapshot called ' +
      quote(exactSpecName || specName) +
      '\n' +
      'test key ' +
      quote(key) +
      '\n' +
      'when running on CI (opts.ci = 1)\n' +
      'see https://github.com/bahmutov/snap-shot-core/issues/5'
  )
}

/**
 * Returns object with "value" property (stored value)
 * and "key" (formed snapshot name).
 *
 * Note: when throwing an error,
 * "key" property is attached to the thrown error instance.
 */
function core (options) {
  la(is.object(options), 'missing options argument', options)
  options = R.clone(options) // to avoid accidental mutations

  const what = options.what // value to store
  la(
    what !== undefined,
    'Cannot store undefined value\nSee https://github.com/bahmutov/snap-shot-core/issues/111'
  )

  const file = options.file
  const __filename = options.__filename
  const specName = options.specName
  const exactSpecName = options.exactSpecName
  const store = options.store || identity
  const compare = options.compare || utils.compare
  const raiser = options.raiser || fs.raiseIfDifferent
  const ext = options.ext || utils.DEFAULT_EXTENSION
  const comment = options.comment
  const opts = options.opts || {}

  const fileParameter = file || __filename
  la(is.unemptyString(fileParameter), 'missing file', fileParameter)
  la(is.maybe.unemptyString(specName), 'invalid specName', specName)
  la(
    is.maybe.unemptyString(exactSpecName),
    'invalid exactSpecName',
    exactSpecName
  )
  la(specName || exactSpecName, 'missing either specName or exactSpecName')

  la(is.fn(compare), 'missing compare function', compare)
  la(is.fn(store), 'invalid store function', store)
  la(is.fn(raiser), 'invalid raiser function', raiser)
  la(is.maybe.unemptyString(comment), 'wrong comment type', comment)

  if (!('ci' in opts)) {
    debug('set CI flag to %s', isCI)
    opts.ci = isCI
  }

  if (!('sortSnapshots' in opts)) {
    debug('setting sortSnapshots flags to true')
    opts.sortSnapshots = false
  }

  if (!('useRelativePath' in opts)) {
    debug('setting useRelativePath flag to false')
    opts.useRelativePath = false
  }

  if (ext) {
    la(ext[0] === '.', 'extension should start with .', ext)
  }
  debug(`file "${fileParameter}" spec "${specName}"`)

  const setOrCheckValue = any => {
    const index = exactSpecName
      ? 0
      : snapshotIndex({
        counters: snapshotsPerTest,
        file: fileParameter,
        specName,
        exactSpecName
      })
    if (index) {
      la(
        is.positive(index),
        'invalid snapshot index',
        index,
        'for\n',
        specName,
        '\ncounters',
        snapshotsPerTest
      )
      debug('spec "%s" snapshot is #%d', specName, index)
    }

    const value = strip(any)
    const key = savedSnapshotName({ exactSpecName, specName, index })
    la(
      is.unemptyString(key),
      'expected snapshot key to be a string',
      key,
      'exact spec name',
      exactSpecName,
      'spec name',
      specName,
      'index',
      index
    )

    const expected = findStoredValue({
      file: fileParameter,
      specName,
      exactSpecName,
      index,
      ext,
      opts
    })
    if (expected === undefined) {
      if (opts.ci) {
        console.log('current directory', process.cwd())
        console.log('new value to save: %j', value)
        return throwCannotSaveOnCI({
          value,
          fileParameter,
          exactSpecName,
          specName,
          index
        })
      }

      const storedValue = store(value)
      storeValue({
        file: fileParameter,
        specName,
        exactSpecName,
        index,
        value: storedValue,
        ext,
        comment,
        opts
      })

      return {
        value: storedValue,
        key
      }
    }

    const usedSpecName = specName || exactSpecName
    debug('found snapshot for "%s", value', usedSpecName, expected)

    try {
      raiser({
        value,
        expected,
        specName: usedSpecName,
        compare
      })
    } catch (e) {
      // so the users know the snapshot used to compare
      e.key = key
      throw e
    }

    return {
      value: expected,
      key
    }
  }

  if (isPromise(what)) {
    return what.then(setOrCheckValue)
  } else {
    return setOrCheckValue(what)
  }
}

if (isBrowser) {
  // there might be async step to load test source code in the browser
  la(is.fn(fs.init), 'browser file system is missing init', fs)
  core.init = fs.init
}

const prune = require('./prune')(fs).pruneSnapshots

module.exports = {
  core,
  restore,
  prune,
  throwCannotSaveOnCI,
  savedSnapshotName,
  storeValue
}
