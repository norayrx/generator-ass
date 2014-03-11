module.exports = (function () {
    var util = require('util');
    var fs = require('fs');
    var path = require('path');
    var _s = require('underscore.string');
    var ModuleNamer = require('../namers').module;
    var componentWriter = require('../writers').component();
    var NameBaseGenerator = require('yeoman-generator').generators.NamedBase;

    var DEFAULT_APP_NAME = 'App';

    var ComponentGenerator = function (arg, args) {
        NameBaseGenerator.apply(this, arguments);
        this.componentType = args.name;

        this.nested = this.options.nested;
        this.moduleName = this.options.moduleName;
    }

    util.inherits(ComponentGenerator, NameBaseGenerator);

    ComponentGenerator.prototype.init = function () {
        this.sourceRoot(path.join(__dirname, '../templates/component'));
    }

    ComponentGenerator.prototype.askFor = function () {
        if (this.options.nested)return;
        var done = this.async();
        var prompts = [
            {
                name: 'moduleName',
                message: 'In which module do you want to create your ' + this.componentType + '?',
                default: 'root'
            }
        ];

        this.prompt(prompts, function (props) {
            this.moduleName = _s.humanize(props.moduleName).toLowerCase();
            done();
        }.bind(this));
    }

    ComponentGenerator.prototype.createNamers = function () {
        this.moduleName = ~['', 'root'].indexOf(this.moduleName) ? DEFAULT_APP_NAME : this.moduleName;
        this.moduleNamer = ModuleNamer(this.moduleName, {isRoot: this.moduleName === DEFAULT_APP_NAME});
        this.componentNamer = this.moduleNamer.getComponent(this.componentType, this.name);
    }

    ComponentGenerator.prototype.checkFiles = function () {
        if (!fs.existsSync(this.moduleNamer.getComponentsPath(this.componentType) + '/_module.js')) {
            this.template('_module.js', this.moduleNamer.getComponentsPath(this.componentType) + '/_module.js');
        }

        if (!fs.existsSync(this.moduleNamer.getComponentsPath(this.componentType) + '/_package.js')) {
            this.template('_package.js', this.moduleNamer.getComponentsPath(this.componentType) + '/_package.js');
        }
    }

    ComponentGenerator.prototype.updatePackage = function () {
        if (!fs.existsSync(this.componentNamer.getPath() + '.js')) {
            var packageContent = this.readFileAsString(this.moduleNamer.getComponentsPath(this.componentType) + '/_package.js');
            var updatedPackageContent = componentWriter.addRequire(packageContent, this.componentNamer.getRelativePath());
            fs.writeFileSync(this.moduleNamer.getComponentsPath(this.componentType) + '/_package.js', updatedPackageContent);
        }

    }

    ComponentGenerator.prototype.checkUniqueFiles = function () {
        switch (this.componentType) {
            case 'directive':
                if (!fs.existsSync(this.moduleNamer.getPath() + '/styles/directives/_styles.css')) {
                    this.template('../module/_directives_styles.css', this.moduleNamer.getPath() + '/styles/directives/_styles.css');
                }
                break;
        }
    }

    ComponentGenerator.prototype.createUniqueFiles = function () {
        switch (this.componentType) {
            case 'directive':
                var directiveStylesFilepath = this.moduleNamer.getPath() + '/styles/directives/' + this.componentNamer.getName() + '.css';
                if (!fs.existsSync(directiveStylesFilepath)) {
                    var stylesContent = this.readFileAsString(this.moduleNamer.getPath() + '/styles/directives/_styles.css');
                    var updatedPackageContent = componentWriter.addImport(stylesContent, this.componentNamer.getName() + '.css');
                    fs.writeFileSync(this.moduleNamer.getComponentsPath('style') + '/directives/_styles.css', updatedPackageContent);
                }
                this.template('directive/_directive_styles.css', this.moduleNamer.getPath() + '/styles/directives/' + this.componentNamer.getName() + '.css');
                this.template('directive/_directive_template.html', this.moduleNamer.getPath() + '/templates/directives/' + this.componentNamer.getName() + '.html');
                this.template('_component_directive.js', this.componentNamer.getPath() + '.js');
                break;
            default :
                this.template('_component.js', this.componentNamer.getPath() + '.js');
        }
    }

    return ComponentGenerator;
})();