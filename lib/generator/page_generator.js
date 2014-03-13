module.exports = (function () {
    var util = require('util');
    var fs = require('fs');
    var path = require('path');
    var ModuleNamer = require('../namers').module;
    var componentWriter = require('../writers').component();

    var NameBaseGenerator = require('yeoman-generator').generators.NamedBase;

    var PageGenerator = function (arg) {
        NameBaseGenerator.apply(this, arguments);
    }

    util.inherits(PageGenerator, NameBaseGenerator);

    PageGenerator.prototype.init = function () {
        this.sourceRoot(path.join(__dirname, '../templates'));
        this.appNamer = ModuleNamer('app', {isRoot: true});
        this.name = this.appNamer.convertToFilename(this.name);
        this.controllerNamer = this.appNamer.getComponent('controller', this.name);
    }

    PageGenerator.prototype.checkFiles = function () {
        if (!fs.existsSync(this.appNamer.getAppDir() + '/main.js')) {
            this.template('app/_main.js', this.appNamer.getAppDir() + '/main.js');
        }
        if (!fs.existsSync(this.appNamer.getComponentsPath('style') + '/styles.css')) {
            this.template('app/_styles.css', this.appNamer.getComponentsPath('style') + '/styles.css');
        }
    }

    PageGenerator.prototype.createFiles = function () {
        this.template('page/_view.html', this.appNamer.getComponentsPath('template') + '/views/' + this.name + '.html');
        this.template('page/_styles.css', this.appNamer.getComponentsPath('style') + '/views/' + this.name + '.css');
    }

    PageGenerator.prototype.createController = function () {
        this.invoke('ass:controller', {args: [this.name], options: {nested: true, moduleName: 'root'}});
    }

    PageGenerator.prototype.updateRouter = function () {
        var packageContent = this.readFileAsString(this.appNamer.getAppDir() + '/main.js');
        var updatedPackageContent = componentWriter.addRoute(packageContent, this.name, this.controllerNamer.getAngularName(), this.appNamer.getComponentsRelativePath('template') + '/views/' + this.name + '.html');
        fs.writeFileSync(this.appNamer.getAppDir() + '/main.js', updatedPackageContent);
    }

    PageGenerator.prototype.updateStyles = function () {
        var stylesContent = this.readFileAsString(this.appNamer.getComponentsPath('style') + '/styles.css');
        var updatedPackageContent = componentWriter.addImport(stylesContent, 'views/' + this.name + '.css');
        fs.writeFileSync(this.appNamer.getComponentsPath('style') + '/styles.css', updatedPackageContent);

    }

    return PageGenerator;
})();