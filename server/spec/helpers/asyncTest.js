function asyncTest(test) {
  return function (done) {
    test().then(() => done()).catch(done.fail);
  };
}

module.exports = { asyncTest };
