'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const disparity = require('disparity')
const Result = require('folktale/result')

function removeExplanation (text) {
  return text
    .split('\n')
    .filter(x => !x.includes('--- removed'))
    .filter(x => !x.includes('+++ added'))
    .filter(x => !x.includes('@@ '))
    .filter(x => !x.includes('No newline at end of file'))
    .join('\n')
    .replace(/\n+$/, '\n')
}

function textDifference (expected, value, noColor) {
  const diff = noColor ? disparity.unifiedNoColor : disparity.unified
  const textDiff = diff(expected, value)
  return removeExplanation(textDiff)
}

function compareText (expected, value, noColor, json) {
  const textDiff = textDifference(expected, value, noColor)
  if (!textDiff) {
    return Result.Ok()
  }
  if (json) {
    return Result.Error({
      message: textDiff,
      expected,
      value
    })
  }
  return Result.Error(textDiff)
}

function repeat (c, n) {
  let s = ''
  for (let k = 0; k < n; k += 1) {
    s += c
  }
  return s
}

function header (text) {
  la(is.unemptyString(text), 'missing header text', text)
  const n = text.length
  const hr = repeat('-', n)
  return hr + '\n' + text + '\n' + hr + '\n'
}

function maybeEndNewLine (text) {
  if (text.endsWith('\n')) {
    return ''
  } else {
    return '\n'
  }
}

function compareLongText (snapshotValue, value, json) {
  if (snapshotValue === value) {
    return Result.Ok()
  }

  const textDiff = textDifference(snapshotValue, value, true)

  if (json) {
    return Result.Error({
      message: textDiff,
      expected: snapshotValue,
      value
    })
  }

  const diff =
    '\n' +
    header('Difference') +
    textDiff +
    maybeEndNewLine(textDiff) +
    header('Saved snapshot text') +
    snapshotValue +
    maybeEndNewLine(snapshotValue) +
    header('Current text') +
    value +
    maybeEndNewLine(value) +
    header('Diff end')

  return Result.Error(diff)
}

const raise = () => {
  throw new Error('should not happen')
}

const isUndefined = x => {
  la(is.not.defined(x))
}

const asResult = x => Result.of(x)

// eslint-disable-next-line immutable/no-mutation
module.exports = {
  raise,
  isUndefined,
  asResult,
  compareText,
  compareLongText,
  textDifference
}
