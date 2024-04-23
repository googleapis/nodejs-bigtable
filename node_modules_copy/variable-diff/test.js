var tap = require('tap');
var diff = require('./');
var test = tap.test;

test('null no diff', function(t) {
  t.same(diff(null, null), {
    changed: false,
    text: ''
  });
  t.end();
});

test('null and object', function(t) {
  t.same(diff(null, { a: 1 }), {
    changed: true,
    text: 'null => {"a":1}'
  });
  t.end();
});

test('null and string', function(t) {
  t.same(diff(null, 'b'), {
    changed: true,
    text: 'null => "b"'
  });
  t.end();
});

test('undefined no diff', function(t) {
  t.same(diff(undefined, undefined), {
    changed: false,
    text: ''
  });
  t.end();
});

test('undefined and number', function(t) {
  t.same(diff(undefined, 21), {
    changed: true,
    text: 'undefined => 21'
  });
  t.end();
});

test('string no diff', function(t) {
  t.same(diff('hello', 'hello'), {
    changed: false,
    text: ''
  });
  t.end();
});

test('string changed', function(t) {
  t.same(diff('hello', 'hellos'), {
    changed: true,
    text: '"hello" => "hellos"'
  });
  t.end();
});

test('string to number', function(t) {
  t.same(diff('fun', 9), {
    changed: true,
    text: '"fun" => 9'
  });
  t.end();
});

test('string to function', function(t) {
  t.same(diff('fun', function hello() { console.log('test') }), {
    changed: true,
    text: '"fun" => function hello() {}'
  });
  t.end();
});

test('string to regex', function(t) {
  t.same(diff('fun', /search/), {
    changed: true,
    text: '"fun" => /search/'
  });
  t.end();
});

test('number not changed', function(t) {
  t.same(diff(987, 987), {
    changed: false,
    text: ''
  });
  t.end();
});
test('number and string', function(t) {
  t.same(diff(1, 'hellos'), {
    changed: true,
    text: '1 => "hellos"'
  });
  t.end();
});

test('number and object', function(t) {
  t.same(diff(9, { test: 1 }), {
    changed: true,
    text: '9 => {"test":1}'
  });
  t.end();
});

test('function not changed', function(t) {
  function myFunc() {}
  t.same(diff(myFunc, myFunc), {
    changed: false,
    text: ''
  });
  t.end();
});

test('function same code different function', function(t) {
  t.same(diff(function test() { console.log('1'); } , function test() { console.log('1'); }), {
    changed: true,
    text: 'function test() {} => function test() {}'
  });
  t.end();
});

test('function and number', function(t) {
  t.same(diff(function () { console.log('1'); } , 2), {
    changed: true,
    text: 'function () {} => 2'
  });
  t.end();
});

test('array switch index', function(t) {
  t.same(diff([9,8,1], [8,9,1]), {
    changed: true,
    text: '[\n  0: 9 => 8\n  1: 8 => 9\n]'
  });
  t.end();
});

test('array add 2 items', function(t) {
  t.same(diff([8,9,1], [8,9,1,4,3]), {
    changed: true,
    text: '[\n+ 3: 4\n+ 4: 3\n]'
  });
  t.end();
});

test('array remove 2 items', function(t) {
  t.same(diff([9,8,7], [9]), {
    changed: true,
    text: '[\n- 1: 8\n- 2: 7\n]'
  });
  t.end();
});

test('array empty', function(t) {
  t.same(diff([], []), {
    changed: false,
    text: ''
  });
  t.end();
});

test('array and object', function(t) {
  t.same(diff([1,2], { key: 1 }), {
    changed: true,
    text: '[1,2] => {"key":1}'
  });
  t.end();
});

test('array and null', function(t) {
  t.same(diff([2], null), {
    changed: true,
    text: '[2] => null'
  });
  t.end();
});

test('object same structure', function(t) {
  t.same(diff({ test: 1, and: 'fun'}, { test: 1, and: 'fun'}), {
    changed: false,
    text: ''
  });
  t.end();
});

test('object nested object', function(t) {
  t.same(diff({ test: { a: { b: 3, c: 5}}, and: 'fun'}, { test: { a: { b: 3, c: 5}}, and: 'fun'}), {
    changed: false,
    text: ''
  });
  t.end();
});

test('object nested object different', function(t) {
  t.same(diff({ test: { a: { b: 3, c: 5}}, and: 'fun'}, { test: { a: { b: 3, c: 'test'}}, and: 'fun'}), {
    changed: true,
    text: '{\n  test: {\n    a: {\n      c: 5 => "test"\n    }\n  }\n}'
  });
  t.end();
});

test('object keys removed', function(t) {
  t.same(diff({ a: 1, b: 2, c: 3}, { a: 1 }), {
    changed: true,
    text: '{\n- b: 2\n- c: 3\n}'
  });
  t.end();
});

test('object keys added', function(t) {
  t.same(diff({ a: 1 }, { a: 1, b: 9, c: 2 }), {
    changed: true,
    text: '{\n+ b: 9\n+ c: 2\n}'
  });
  t.end();
});

test('object with nested array', function(t) {
  t.same(diff({ test: { a: [5,6,7]}, and: 'fun'}, { test: { a: [9,8,2,4]}, and: 'fun'}), {
    changed: true,
    text: '{\n  test: {\n    a: [\n      0: 5 => 9\n      1: 6 => 8\n      2: 7 => 2\n    + 3: 4\n    ]\n  }\n}'
  });
  t.end();
});

test('complex nested object difference', function(t) {
  t.same(diff({ test: { a: [5,6,7]}, b: { c: 1 }, and: 'fun'}, { test: { a: [9,8,2,4]}, b: {d: 2 }, and: [1,2]}), {
    changed: true,
    text: '{\n  and: "fun" => [1,2]\n  b: {\n  - c: 1\n  + d: 2\n  }\n  test: {\n    a: [\n      0: 5 => 9\n      1: 6 => 8\n      2: 7 => 2\n    + 3: 4\n    ]\n  }\n}'
  });
  t.end();
});