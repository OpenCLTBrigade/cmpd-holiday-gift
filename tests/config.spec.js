describe("Configuration setup", function() {
    it("should load local configurations", function() {
        var config = require('../config')();
        expect(config.mode).toBe('local');
    });
});
