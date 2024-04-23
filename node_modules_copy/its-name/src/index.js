'use strict'

const unempty = x => x

function itsName (t) {
  if (!t) {
    throw new Error('Missing test object')
  }
  // maybe we already have Test instance
  const test = t.title ? t : t.test
  if (!test) {
    throw new Error('Test property is missing')
  }
  if (!test.title) {
    throw new Error('Test.title property is missing')
  }
  const names = []
  for (let k = test; k; k = k.parent) {
    names.push(k.title)
  }
  // reverse so that top level spec is first
  // and the test name is last
  return names.filter(unempty).reverse()
}

module.exports = itsName
