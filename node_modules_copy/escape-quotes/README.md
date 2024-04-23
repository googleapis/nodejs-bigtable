[![Build Status](https://travis-ci.org/mgduk/escape-quotes.svg?branch=master)](https://travis-ci.org/mgduk/escape-quotes)
[![GitHub issues](https://img.shields.io/github/issues/mgduk/escape-quotes.svg)](https://github.com/mgduk/escape-quotes/issues)

Adds a backslash before single quotes in a string (or whichever characters you like)

Examples
--------
```js
escape_quotes = require('escape-quotes');

escape_quotes("I'm a little teapot");
// => I\'m a little teapot

escape_quotes("No thanks, I already have a penguin", "a", "*");
// => No th*anks, I *alre*ady h*ave *a penguin
```

Usage
-----
```js
escape_quotes("String to escape chars in", "chars to escape" = "'", "escape char" = "\\")
```

Escape multiple characters by passing multiple characters in the second parameter


Tests
-----
```
npm test
```

Licence
-------
```
MIT License

Copyright (c) 2016 Matt Dolan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```