const R = require('ramda')
const debug = require('debug')('snap-shot-core')
const pluralize = require('pluralize')
const la = require('lazy-ass')
const is = require('check-more-types')
const utils = require('./utils')

/**
 * Checks if the snapshot to keep has all information
 */
const isRunTimeSnapshot = is.schema({
  specFile: is.unemptyString,
  key: is.unemptyString
})

const pruneSnapshotsInObject = (runtimeSnapshots, snapshots) => {
  la(is.array(runtimeSnapshots), 'invalid runtime snapshots', runtimeSnapshots)
  runtimeSnapshots.forEach((r, k) => {
    la(isRunTimeSnapshot(r), 'invalid runtime snapshot', r, 'at index', k)
  })

  const keys = R.map(R.prop('key'), runtimeSnapshots)
  debug(
    'have runtime %s before pruning',
    pluralize('snapshot name', keys.length, true)
  )
  if (debug.enabled) {
    // make sure NOT to mutate the list of snapshot names
    // otherwise we will save the pruned object with keys
    // in the sorted order!
    debug(keys)
    debug('snapshot file keys in the current order')
    debug(R.keys(snapshots))
  }

  const isPresent = (val, key) => {
    return R.includes(key, keys)
  }
  const prunedSnapshots = R.pickBy(isPresent, snapshots)
  debug(
    'after pruning %s remaining',
    pluralize('snapshot name', R.keys(prunedSnapshots).length, true)
  )
  if (debug.enabled) {
    debug(R.keys(prunedSnapshots))
  }

  return prunedSnapshots
}

const pruneSnapshotsInFile = ({ fs, byFilename, ext }, opts) => file => {
  const snapshots = fs.loadSnapshots(file, ext, {
    useRelativePath: opts.useRelativePath || false
  })
  if (is.empty(snapshots)) {
    debug('empty snapshots to prune in file', file)
    return
  }

  const runtimeSnapshots = byFilename[file]
  debug('run time snapshots by file')
  debug(runtimeSnapshots)

  const prunedSnapshots = pruneSnapshotsInObject(runtimeSnapshots, snapshots)
  if (R.equals(prunedSnapshots, snapshots)) {
    debug('nothing to prune for file', file)
    return
  }

  debug('saving pruned snapshot file for', file)

  const saveOptions = R.pick(['sortSnapshots', 'useRelativePath'], opts)
  debug('save options %o', saveOptions)
  fs.saveSnapshots(file, prunedSnapshots, ext, saveOptions)
}

// TODO switch to async id:3
// Gleb Bahmutov
// gleb.bahmutov@gmail.com
// https://github.com/bahmutov/snap-shot-core/issues/88
/**
 * Prunes all unused snapshots for given tests.
 */
const pruneSnapshots = fs => (
  { tests, ext = utils.DEFAULT_EXTENSION },
  opts = {
    useRelativePath: false,
    sortSnapshots: false
  }
) => {
  la(is.array(tests), 'missing tests', tests)
  debug('pruning snapshots')
  debug('run time tests')
  debug(tests)

  const byFilename = R.groupBy(R.prop('specFile'), tests)
  debug('run-time tests by file')
  debug(byFilename)

  Object.keys(byFilename).forEach(
    pruneSnapshotsInFile({ fs, byFilename, ext }, opts)
  )
}

module.exports = fs => {
  return {
    pruneSnapshots: pruneSnapshots(fs),
    pruneSnapshotsInObject
  }
}
