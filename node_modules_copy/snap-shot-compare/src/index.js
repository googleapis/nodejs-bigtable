'use strict'

const diff = require('variable-diff')
const is = require('check-more-types')
const utils = require('./utils')
const Result = require('folktale/result')
const stripAnsi = require('strip-ansi')
const debug = require('debug')('snap-shot-compare')

const isMultiLineText = s => is.string(s) && s.includes('\n')
const areStrings = (s, t) => is.string(s) && is.string(t)
const compareAsStrings = (s, t) =>
  areStrings(s, t) && (isMultiLineText(s) || isMultiLineText(t))

// looks at number of lines
const isLong = s => s.split('\n').length > 9

const diffAsLongText = (s, t) =>
  compareAsStrings(s, t) && (isLong(s) || isLong(t))

const compareObjects = diff

function compare ({ expected, value, json, noColor }) {
  if (compareAsStrings(value, expected)) {
    if (diffAsLongText(value, expected)) {
      debug('compare as long text')
      return utils.compareLongText(expected, value, json)
    } else {
      debug('compare as normal text')
      debug('expected')
      debug(expected)
      debug('current value')
      debug(value)
      return utils.compareText(expected, value, noColor, json)
    }
  }

  debug('comparing objects')
  const diffed = compareObjects(expected, value)
  if (!diffed.changed) {
    return Result.Ok()
  }

  if (json) {
    noColor = true
  }

  const diffText = noColor ? stripAnsi(diffed.text) : diffed.text

  if (json) {
    return Result.Error({
      message: diffText,
      expected,
      value
    })
  }
  return Result.Error(diffText)
}

// eslint-disable-next-line immutable/no-mutation
module.exports = compare
