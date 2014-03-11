module.exports = (function () {
    var util = require('util');
    var fs = require('fs');
    var path = require('path');
    var ModuleNamer = require('../namers').module;
    var componentWriter = require('../writers').component();

    var NameBaseGenerator = require('yeoman-generator').generators.NamedBase;

    var ModuleGenerator = function (arg) {
        NameBaseGenerator.apply(this, arguments);
    }

    util.inherits(ModuleGenerator, NameBaseGenerator);

    ModuleGenerator.prototype.init = function () {
        this.sourceRoot(path.join(__dirname, '../templates'));
        this.moduleNamer = ModuleNamer(this.name, {isRoot: false});
    }

    ModuleGenerator.prototype.checkFiles = function () {
        if (!fs.existsSync(this.moduleNamer.getAppDir() + '/main.js')) {
            this.appNamer = ModuleNamer('app', {isRoot: true});
            this.template('app/_main.js', this.appNamer.getAppDir() + '/main.js');
        }

        if (!fs.existsSync(this.moduleNamer.getAppDir() + '/styles/styles.css')) {
            this.copy('app/_styles.css', this.moduleNamer.getAppDir() + '/styles/styles.css');
        }
    }

    ModuleGenerator.prototype.updatePackage = function () {
        var packageContent = this.readFileAsString(this.moduleNamer.getAppDir() + '/main.js');
        var updatedPackageContent = componentWriter.addRequire(packageContent, this.moduleNamer.getRelativePath() + '/main');
        var appNamer = ModuleNamer('app', {isRoot: true});
        updatedPackageContent = componentWriter.addAngularModule(updatedPackageContent, appNamer.getAngularName(), this.moduleNamer.getAngularName());
        fs.writeFileSync(this.moduleNamer.getAppDir() + '/main.js', updatedPackageContent);

        var stylesContent = this.readFileAsString(this.moduleNamer.getAppDir() + '/styles/styles.css');
        var updatedStylesContent = componentWriter.addImport(stylesContent, '../' + this.moduleNamer.getRelativePath() + '/styles/styles.css');
        fs.writeFileSync(this.moduleNamer.getAppDir() + '/styles/styles.css', updatedStylesContent);
    }

    ModuleGenerator.prototype.files = function () {
        this.mkdir(this.moduleNamer.getPath());

        this.mkdir(this.moduleNamer.getPath() + '/templates');
        this.mkdir(this.moduleNamer.getPath() + '/templates/directives');

        this.mkdir(this.moduleNamer.getPath() + '/styles');
        this.mkdir(this.moduleNamer.getPath() + '/styles/directives');

        this.template('module/_main.js', this.moduleNamer.getPath() + '/main.js');

        this.template('module/_styles.css', this.moduleNamer.getPath() + '/styles/styles.css');

        this.template('module/_directives_styles.css', this.moduleNamer.getPath() + '/styles/directives/_styles.css');
    }

    ModuleGenerator.prototype.createComponents = function () {
        var self = this;
        var componentTypes = ['controller', 'service', 'filter', 'directive'];

        componentTypes.forEach(function (componentType) {
            self.componentType = componentType;
            self.mkdir(self.moduleNamer.getComponentsPath(componentType));
            self.template('component/_module.js', self.moduleNamer.getComponentsPath(componentType) + '/_module.js');
            self.template('component/_package.js', self.moduleNamer.getComponentsPath(componentType) + '/_package.js');
        });
    }

    return ModuleGenerator;
})();