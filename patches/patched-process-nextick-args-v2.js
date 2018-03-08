module.exports = {
  nextTick: function() {
    process.nextTick.apply(this, arguments)
  }
};
