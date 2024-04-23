!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.quote=e()}}(function(){var define,module,exports;module={exports:(exports={})};
function emptyQuotes(options) {
  return options.quotes + options.quotes;
}

function quoteString(options, str) {
  if (str === '') {
    return emptyQuotes(options);
  }
  if (str[0] !== options.quotes) {
    str = options.quotes + str;
  }
  if (str[str.length - 1] !== options.quotes) {
    str += options.quotes;
  }
  return str;
}

function quoteOptions(options, str) {
  if (arguments.length === 1) {
    str = options;
    options = { quotes: '"' };
  }

  if (typeof str === 'string') {
    return quoteString(options, str);
  }

  if (typeof str === 'undefined' || str === null) {
    return emptyQuotes(options);
  }

  return str;
}

function quote(str) {
  if (typeof str === 'object') {
    return quoteOptions.bind(null, str);
  }
  return quoteOptions(str);
}

module.exports = quote;

return module.exports;});