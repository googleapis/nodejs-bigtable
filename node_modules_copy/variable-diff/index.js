'use strict';

var chalk = require('chalk');
var objectAssign = require('object-assign');

var typeColors = {
  modified: 'yellow',
  added: 'green',
  removed: 'red'
};

var options = {
  indent: 2,
  indentChar: ' ',
  newLineChar: '\n',
  wrap: function wrap(type, text) {
    return chalk[typeColors[type]](text);
  }
};

var indent = '';
for (var i = 0; i < options.indent; i++) {
  indent += options.indentChar;
}

function isObject(obj) {
  return typeof obj === 'object' && obj && !Array.isArray(obj);
}

function printVar(variable) {
  if (typeof variable === 'function') {
    return variable.toString().replace(/\{.+\}/,'{}');
  } else if((typeof variable === 'object' || typeof variable === 'string') && !(variable instanceof RegExp)) {
    return JSON.stringify(variable);
  }

  return '' + variable;
}

function indentSubItem(text) {
  return text.split(options.newLineChar).map(function onMap(line, index) {
    if (index === 0) {
      return line;
    }
    return indent + line;
  }).join(options.newLineChar);
}

function keyChanged(key, text) {
  return indent + key + ': ' + indentSubItem(text) + options.newLineChar
}

function keyRemoved(key, variable) {
  return options.wrap('removed', '- ' + key + ': ' + printVar(variable)) + options.newLineChar;
}

function keyAdded(key, variable) {
  return options.wrap('added', '+ ' + key + ': ' + printVar(variable)) + options.newLineChar;
}

function diff(left, right) {
  var text = '';
  var changed = false;
  var itemDiff;
  var keys;
  var subOutput = '';

  if (Array.isArray(left) && Array.isArray(right)) {
    for (var i = 0; i < left.length; i++) {
      if (i < right.length) {
        itemDiff = diff(left[i], right[i]);
        if (itemDiff.changed) {
          subOutput += keyChanged(i, itemDiff.text);
          changed = true;
        }
      } else {
        subOutput += keyRemoved(i, left[i]);
        changed = true;
      }
    }
    if (right.length > left.length) {
      for (; i < right.length; i++) {
        subOutput +=  keyAdded(i, right[i]);
      }
      changed = true;
    }
    if (changed) {
      text = '[' + options.newLineChar + subOutput + ']';
    }
  } else if (isObject(left) && isObject(right)) {
    keys = Object.keys(left);
    var rightObj = objectAssign({}, right);
    var key;
    keys.sort();
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      if (right.hasOwnProperty(key)) {
        itemDiff = diff(left[key], right[key]);
        if (itemDiff.changed) {
          subOutput += keyChanged(key, itemDiff.text);
          changed = true;
        }
        delete rightObj[key];
      } else {
        subOutput += keyRemoved(key, left[key]);
        changed = true;
      }
    }

    var addedKeys = Object.keys(rightObj);
    for (var i = 0; i < addedKeys.length; i++) {
      subOutput += keyAdded(addedKeys[i], right[addedKeys[i]]);
      changed = true;
    }

    if (changed) {
      text = '{' + options.newLineChar + subOutput + '}';
    }

  } else if (left !== right) {
    text = options.wrap('modified', printVar(left) + ' => ' + printVar(right));
    changed = true;
  }

  return {
    changed: changed,
    text: text
  };
}


module.exports = diff;