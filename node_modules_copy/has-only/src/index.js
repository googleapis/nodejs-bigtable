'use strict'

function findRoot (test) {
  if (!test) {
    return
  }

  while (test.parent) {
    test = test.parent
  }
  return test
}

function isUnemptyArray (a) {
  return Array.isArray(a) && a.length
}

/*
  Returns true if there are exclusive tests or suites. A test is exlusive
  if it has "it.only" modifier, same for suites.

  Typical scenario

    it('a', ...)
    describe('s', () => {
      it('b', ...)
      it.only('c', ...)
    })

  There are 2 suites: root and "s"
  The root suite has 1 test and 1 suite, but no "only" items
  The we traverse into "s" and find 1 "_onlyTests" and return true
*/
function _hasOnly (suite) {
  if (!suite) {
    return false
  }
  if (isUnemptyArray(suite._onlyTests)) {
    return true
  }

  if (isUnemptyArray(suite._onlySuites)) {
    return true
  }

  if (!Array.isArray(suite.suites)) {
    return false
  }

  return suite.suites.some(_hasOnly)
}

function _hasTestOrHookFailed (test) {
  return test.state === 'failed'
}

function _hasFailed (suite) {
  if (!suite) {
    return false
  }

  if (suite.tests && suite.tests.some(_hasTestOrHookFailed)) {
    return true
  }

  if (suite._beforeAll && suite._beforeAll.some(_hasTestOrHookFailed)) {
    return true
  }

  if (suite._beforeEach && suite._beforeEach.some(_hasTestOrHookFailed)) {
    return true
  }

  if (suite._afterEach && suite._afterEach.some(_hasTestOrHookFailed)) {
    return true
  }

  if (suite._afterAll && suite._afterAll.some(_hasTestOrHookFailed)) {
    return true
  }

  return suite.suites.some(_hasFailed)
}

//
/*
beforeEach(function () {
  hasOnly(this.test) // true or false
  hasOnly(this) // same
})
*/

/**
 * Returns true if some suite or test has ".only" flag.
 *
 * @param {any} test Context or a test
 * @returns {boolean} `true` if there is an ".only"
 * @example beforeEach(function () {
      hasOnly(this.test) // true or false
      hasOnly(this) // same
    })
 */
function hasOnly (test) {
  if (!test) {
    throw new Error('Missing current test')
  }
  // we can pass both current context or current test
  test = test.test ? test.test : test

  return _hasOnly(findRoot(test))
}

/**
 * Returns true if some test or hook has failed.
 *
 * @param {any} test
 * @returns {boolean} Some test or hook has failed
 * @example after(function () {
 *  if (hasFailed(this)) {
 *    // something went wrong!
 *  }
 * })
 */
function hasFailed (test) {
  if (!test) {
    throw new Error('Missing current test')
  }
  // we can pass both current context or current test
  test = test.test ? test.test : test

  return _hasFailed(findRoot(test))
}

module.exports = { findRoot, hasOnly, hasFailed }
