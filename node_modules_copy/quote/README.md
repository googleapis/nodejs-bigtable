# quote

> Safe quoting a given string without adding duplicate quotes

[![NPM info][nodei.co]](https://npmjs.org/package/quote)

[![Build status][ci-image]][ci-url]
[![dependencies][dependencies-image]][dependencies-url]
[![devdependencies][quote-devdependencies-image] ][quote-devdependencies-url]

Install using node or bower

    npm install quote --save
    bower install quote --save

Use

    // node
    var quote = require('quote');
    quote('foo'); // "foo"
    quote('"foo"'); // "foo"
    quote(quote('foo')); // "foo"

In the browser just use global function `quote`

## Changing quote character

Only single quote character is supported, default is double quotes `"`.
To change:

    var quote = require('quote')({ quotes: '*' });
    quote('foo'); // *foo*
    quote('bar'); // *bar*

## To build and test

Because this is both Node and browser package, you need to build it using 
[universal module definition CLI tool](https://github.com/ForbesLindesay/umd).

    npm run build
    npm test

## Small print

Author: Gleb Bahmutov &copy; 2014
[@bahmutov](https://twitter.com/bahmutov) [glebbahmutov.com](http://glebbahmutov.com)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github

[ci-image]: https://travis-ci.org/bahmutov/quote.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/quote
[nodei.co]: https://nodei.co/npm/quote.png?downloads=true
[dependencies-image]: https://david-dm.org/bahmutov/quote.png
[dependencies-url]: https://david-dm.org/bahmutov/quote
[quote-devdependencies-image]: https://david-dm.org/bahmutov/quote/dev-status.png
[quote-devdependencies-url]: https://david-dm.org/bahmutov/quote#info=devDependencies
