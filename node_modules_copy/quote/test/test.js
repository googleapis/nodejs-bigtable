gt.module('quote');

var quote = require('../quote');

gt.test('quote undefined', function () {
  gt.equal(quote(), '""');
});

gt.test('quotes a string', function () {
  gt.equal(quote(''), '""');
  gt.equal(quote('foo'), '"foo"');
  gt.equal(quote(quote('foo')), '"foo"');
});

gt.test('config object', function () {
  var q = quote({ quotes: '*' });
  gt.func(q, 'returns a function');
  gt.equal(q('foo'), '*foo*');
  gt.equal(q(q('foo')), '*foo*');
});

gt.test('different options works independently', function () {
  var wildcards = quote({ quotes: '*' });
  gt.equal(quote('foo'), '"foo"');
  gt.equal(wildcards('foo'), '*foo*');
  var ups = quote({ quotes: '^' });
  gt.equal(ups('bar'), '^bar^');
});

gt.test('can be configured multiple times', function () {
  gt.equal(quote('foo'), '"foo"');
  var q = quote({ quotes: '^' });
  gt.equal(q('bar'), '^bar^');
  // not working yet
  // q = q({ quotes: '$' });
  // gt.equal(q('baz'), '$baz$');
});
