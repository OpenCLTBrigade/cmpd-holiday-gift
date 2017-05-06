// heavily modified from ISC-licensed vue-loader-subcomponent

const loaderUtils = require('loader-utils');
const path = require('path');

module.exports = function subcomponent(content) {
    const query = loaderUtils.parseQuery(this.query);
    const src  = new Buffer(content, 'utf8').toString('hex');
    const file = path.join(this.resourcePath, query.name + '.vue');
    return (
        `
        var name = ${JSON.stringify(query.name)};
        var sc = require("virtual-file-loader?src=${src}&file=${file}!");
        sc.components = sc.components || {};
        module.exports = function(Component) {
            if (Component.exports.$subcomponents) {
                for (var c in Component.exports.$subcomponents) {
                    Component.exports.$subcomponents[c].components[name] = sc;
                    sc.components[c] = Component.exports.$subcomponents[c];
                }
            } else {
                Component.exports.$subcomponents = [sc];
            }
            Component.exports.components = Component.exports.components || {};
            Component.exports.components[name] = sc;
        }`);
};
