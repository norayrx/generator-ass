module.exports = (function () {
    var _s = require('underscore.string');
    var Component = require('./component');

    var ModuleNamer = function (name, settings) {
        settings = settings || {};

        this.name = this.convertToFilename(name);
        this.isRoot = 'undefined' !== typeof settings.isRoot ? settings.isRoot : true;
        this.appDir = 'undefined' !== typeof settings.appDir ? settings.appDir : 'app';
        this.modulesDir = 'undefined' !== typeof settings.modulesDir ? settings.modulesDir : 'modules';

        this.controllerClassify = 'undefined' !== typeof settings.controllerPostfix ? settings.controllerPostfix : true;
        this.controllerPostfix = 'undefined' !== typeof settings.controllerPostfix ? settings.controllerPostfix : 'Ctrl';
        this.controllerPrefix = 'undefined' !== typeof settings.controllerPrefix ? settings.controllerPrefix : this.getAngularName();

        this.servicePrefix = 'undefined' !== typeof  settings.servicePrefix ? settings.servicePrefix : '$';

        this.directivePrefix = 'undefined' !== typeof settings.directivePrefix ? settings.directivePrefix : _s.camelize(this.name);
        this.directiveClassify = 'undefined' !== typeof settings.directiveClassify ? settings.directiveClassify : true;

    }

    ModuleNamer.prototype.convertToFilename = function (name) {
        return _s.underscored(_s.humanize(name));
    }

    ModuleNamer.prototype.getComponent = function (type, name) {
        return new Component(this, type, name, {
            classify: this[type + 'Classify'],
            postfix: this[type + 'Postfix'],
            prefix: this[type + 'Prefix']
        });
    }

    ModuleNamer.prototype.getAppDir = function () {
        return this.appDir;
    }

    ModuleNamer.prototype.getAngularName = function () {
        return _s.classify(this.name);
    }

    ModuleNamer.prototype.getAngularComponentsModuleName = function (type) {
        return this.getAngularName() + '.' + type + 's';
    }

    ModuleNamer.prototype.getPath = function () {
        return this.appDir + (this.isRoot ? '' : '/' + this.getRelativePath());
    }

    ModuleNamer.prototype.getRelativePath = function () {
        return  (this.isRoot ? '' : this.modulesDir + '/' + this.name);
    }

    ModuleNamer.prototype.getComponentsRelativePath = function (type) {
        return (this.isRoot ? '' : this.getRelativePath() + '/') + type + 's';
    }

    ModuleNamer.prototype.getComponentsPath = function (type) {
        return this.appDir + '/' + this.getComponentsRelativePath(type);
    }

    return ModuleNamer;
})();