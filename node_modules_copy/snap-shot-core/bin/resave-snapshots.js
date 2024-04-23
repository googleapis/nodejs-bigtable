#!/usr/bin/env node

'use strict'

const debug = require('debug')('snap-shot-core')
const path = require('path')
const pluralize = require('pluralize')
const { loadSnapshotsFrom, maybeSortAndSave } = require('../src/file-system')
const arg = require('arg')

const help = 'USE: resave-snashots [--sort] <snapshot filename>'

const args = arg({
  '--sort': Boolean,
  // aliases
  '-s': '--sort'
})

debug('resave arguments %o', args)
const invalidFilename = args._.length !== 1
if (invalidFilename) {
  console.error(help)
  process.exit(1)
}

const snapshotFilename = path.resolve(args._[0])
const snapshots = loadSnapshotsFrom(snapshotFilename)
const names = Object.keys(snapshots)
debug('loaded %s', pluralize('snapshot', names.length, true))
debug(names.join('\n'))

const sortSnapshots = Boolean(args['--sort'])
if (sortSnapshots) {
  console.log('saving sorted snapshots to', snapshotFilename)
} else {
  console.log('saving snapshots to', snapshotFilename)
}
maybeSortAndSave(snapshots, snapshotFilename, { sortSnapshots })
