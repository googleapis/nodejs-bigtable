module.exports = function() {
  return process.nextTick.apply(this, arguments);
};
