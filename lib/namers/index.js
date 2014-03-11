module.exports = (function () {
    var ModuleNamer = require('./module');

    return {
        module: function (name, settings) {
            return new ModuleNamer(name, settings);
        }
    };
})();