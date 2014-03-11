module.exports = (function () {
    var util = require('util');
    var fs = require('fs');
    var path = require('path');
    var ModuleNamer = require('../namers').module;
    var yeoman = require('yeoman-generator');
    var BaseGenerator = require('yeoman-generator').generators.Base;

    var DEFAULT_APP_NAME = 'App';

    var AppGenerator = function () {
        BaseGenerator.apply(this, arguments);
    }

    util.inherits(AppGenerator, BaseGenerator);

    AppGenerator.prototype.init = function () {
        this.appNamer = ModuleNamer(DEFAULT_APP_NAME, {isRoot: true});

        this.sourceRoot(path.join(__dirname, '../templates'));

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.npmInstall();
                this.bowerInstall();
            }
        });
    }

    AppGenerator.prototype.createDirectories = function () {
        this.mkdir(this.appNamer.getPath());
        this.mkdir(this.appNamer.getPath() + '/images');
        this.mkdir(this.appNamer.getPath() + '/templates');
        this.mkdir(this.appNamer.getPath() + '/templates/views');
        this.mkdir(this.appNamer.getPath() + '/templates/directives');
        this.mkdir(this.appNamer.getPath() + '/lib');
        this.mkdir(this.appNamer.getPath() + '/modules');
        this.mkdir(this.appNamer.getPath() + '/styles');
        this.mkdir(this.appNamer.getPath() + '/styles/views');
        this.mkdir(this.appNamer.getPath() + '/styles/directives');
    }

    AppGenerator.prototype.createFiles = function () {
        this.template('app/_styles.css', this.appNamer.getPath() + '/styles/styles.css');
        this.template('app/_main.js', this.appNamer.getPath() + '/main.js');
        this.template('app/_package.json', 'package.json');
        this.template('app/_bower.json', 'bower.json');
        this.template('app/bowerrc', '.bowerrc');
        this.template('app/_Gruntfile.js', 'Gruntfile.js');
        this.template('app/_index.html', 'index.html');
        this.template('app/_directives_styles.css', this.appNamer.getPath() + '/styles/directives/_styles.css');
    }

    AppGenerator.prototype.createComponents = function () {
        var self = this;
        var componentTypes = ['controller', 'service', 'filter', 'directive'];

        componentTypes.forEach(function (componentType) {
            self.componentType = componentType;
            self.mkdir(self.appNamer.getComponentsPath(componentType));
            self.moduleNamer = self.appNamer;
            self.template('component/_module.js', self.appNamer.getComponentsPath(componentType) + '/_module.js');
            self.template('component/_package.js', self.appNamer.getComponentsPath(componentType) + '/_package.js');
        });
    }

    AppGenerator.prototype.createPage = function () {
        this.invoke('angular-require:page', {args: ['first']});
    }

    AppGenerator.prototype.createDirective = function () {
        this.invoke('angular-require:directive', {args: ['first'], options: {nested: true, moduleName: 'root'}});
    }

    return AppGenerator;
})();