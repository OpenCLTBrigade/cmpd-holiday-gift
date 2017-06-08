/* eslint-env jasmine */

var {buildViews} = require('./helpers/testServer');
var {asyncTest} = require('./helpers/asyncTest');

describe('All views', () => {
    it('get built without errors', asyncTest(() => buildViews), 60000);
});
