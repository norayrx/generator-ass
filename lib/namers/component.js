module.exports = (function () {
    var _s = require('underscore.string');
    var ALLOWED_COMPONENTS = ['controller', 'service', 'filter', 'directive'];
    var ANGULAR_FACTORIES = {
        controller: 'controller',
        service: 'factory',
        filter: 'filter',
        directive: 'directive'
    };

    var ComponentNamer = function (module, type, name, settings) {
        if (!~ALLOWED_COMPONENTS.indexOf(type))throw 'Not allowed component';
//        if (!( module instanceof ModuleHelper))throw 'First argument must be ModuleHepler instance';
        settings = settings || {};
        this.module = module;
        this.type = type;
        this.name = _s.underscored(_s.humanize(name));
        this.postfix = 'undefined' === typeof settings.postfix ? '' : settings.postfix;
        this.prefix = 'undefined' === typeof settings.prefix ? '' : settings.prefix;
        this.classify = 'undefined' === typeof settings.classify ? false : settings.classify;
    }

    ComponentNamer.prototype.getName = function () {
        return this.name;
    }

    ComponentNamer.prototype.getRelativePath = function () {
        return this.module.getComponentsRelativePath(this.type) + '/' + this.name;
    }

    ComponentNamer.prototype.getPath = function () {
        return this.module.appDir + '/' + this.getRelativePath();
    }

    ComponentNamer.prototype.getAngularName = function () {
        return this.prefix + (this.classify ? _s.classify(this.name) : _s.camelize(this.name)) + this.postfix;
    }

    ComponentNamer.prototype.getAngularFactory = function () {
        return ANGULAR_FACTORIES[this.type];
    }

    return ComponentNamer;
})();