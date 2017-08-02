/* eslint-env jasmine */

var process = require('process');

describe('Default development configuration', function () {
  it('should load fine', function () {
    require('../config');
  });
});
