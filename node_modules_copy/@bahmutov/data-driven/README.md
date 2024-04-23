# @bahmutov/data-driven

> Transforms BDD input into data-driven snapshot

[![NPM][npm-icon] ][npm-url]

[![Build status][ci-image] ][ci-url]
[![semantic-release][semantic-image] ][semantic-url]
[![js-standard-style][standard-image]][standard-url]

## Install

Requires [Node](https://nodejs.org/en/) version 6 or above.

```sh
npm install --save @bahmutov/data-driven
```

## Use

Data-driven snapshot testing takes as an input a pure function and a bunch of arguments.

```js
// is this data-driven test? for example
snapshot(isPrime, 1, 2, 3, 4, 5)
// or
snapshot(add, [1, 2], [-5, 5], [4, 6])
```

This module detects the above cases, and also has a utility method to compute the expected
result. From snap-shot frameworks, like [snap-shot][snap-shot] and [snap-shot-it][snap-shot-it]
when getting a value check if user wants data-driven value, and if yes, compute it.

```js
const {isDataDriven, dataDriven} = require('@bahmutov/data-driven')
function snapshot(what) {
  if (isDataDriven(arguments)) {
    what = dataDriven(what, Array.from(arguments).slice(1))
  }
}
```

A typical value transformation would be

```js
const results = dataDriven(isPrime, [1, 2, 3])
/* results is
{
  name: 'isPrime',
  behavior: [
    {
      given: 1,
      expect: false
    },
    {
      given: 2,
      expect: true
    },
    {
      given: 3,
      expect: true
    }
  ]
}
*/
```

[snap-shot]: https://github.com/bahmutov/snap-shot
[snap-shot-it]: https://github.com/bahmutov/snap-shot-it

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2017

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/data-driven/issues) on Github

## MIT License

Copyright (c) 2017 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/@bahmutov/data-driven.svg?downloads=true
[npm-url]: https://npmjs.org/package/@bahmutov/data-driven
[ci-image]: https://travis-ci.org/bahmutov/data-driven.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/data-driven
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
