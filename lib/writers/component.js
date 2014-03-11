module.exports = (function () {
    var util = require('util');
    var Writer = require('./writer');

    var ComponentWriter = function () {

    }

    util.inherits(ComponentWriter, Writer);

    ComponentWriter.prototype.addRequire = function (packageString, path) {
        var packageRegex = /define\s*\([\s\S]*?\{(\s*require\(.*?\);?)*/;
        return this.write(packageString, packageRegex, '\n\trequire("' + path + '");');
    }

    ComponentWriter.prototype.addImport = function (packageString, path) {
        var packageRegex = /(\s*@import[\s\S]*?;)*/;
        return this.write(packageString, packageRegex, '\n@import url("' + path + '");');
    }

    ComponentWriter.prototype.addAngularModule = function (moduleString, appName, moduleName) {
        var regex = new RegExp("angular\\.module\\([\"']" + appName + "[\"'], \\[[^\\]]*");
        return this.write(moduleString, regex, ',"' + moduleName + '"');
    }

    ComponentWriter.prototype.addRoute = function (moduleString, route, controllerName, templatePath) {
        var regex = /\([\s\S^"^']*\$routeProvider[\s\S^"^']*\)[\s\S]*\$routeProvider/;
        return this.write(moduleString, regex, '\n\t\t\t\t.when("/' + route + '", {\n' +
            '\t\t\t\t\tcontroller:"' + controllerName + '",\n' +
            '\t\t\t\t\ttemplate:require("text!' + templatePath + '")\n' +
            '\t\t\t\t})');
    }

    return ComponentWriter;
})();