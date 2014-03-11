var path = require('path');
var helpers = require('yeoman-generator').test;

describe('angular-require generator:module', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'module'), function (err) {
            if (err) {
                return done(err);
            }

            this.module = helpers.createGenerator('angular-require:module', [
                '../../module'
            ], 'module');
            done();
        }.bind(this));
    });

    it('Should create module', function (done) {
        var name = 'one';
        var moduleName = name.charAt(0).toUpperCase() + name.slice(1);

        var expected = [
            'app/modules/' + name,
            'app/modules/' + name + '/controllers',
            'app/modules/' + name + '/directives',
            'app/modules/' + name + '/filters',
            'app/modules/' + name + '/services',
            'app/modules/' + name + '/controllers/_package.js',
            'app/modules/' + name + '/directives/_package.js',
            'app/modules/' + name + '/filters/_package.js',
            'app/modules/' + name + '/services/_package.js',
            'app/modules/' + name + '/main.js',
            'app/modules/' + name + '/styles',
            'app/modules/' + name + '/styles/styles.css',
            'app/modules/' + name + '/styles/directives',
            'app/modules/' + name + '/templates',
            'app/modules/' + name + '/templates/directives',
        ];

        var expectedContent = [
            ['app/modules/' + name + '/main.js', new RegExp(moduleName)],
            ['app/modules/' + name + '/controllers/_module.js', new RegExp(moduleName + "\.controllers")],
            ['app/modules/' + name + '/controllers/_package.js', new RegExp(name + "/controllers")],
            ['app/modules/' + name + '/services/_module.js', new RegExp(moduleName + "\.services")],
            ['app/modules/' + name + '/services/_package.js', new RegExp(name + "/services")],
            ['app/modules/' + name + '/filters/_module.js', new RegExp(moduleName + "\.filters")],
            ['app/modules/' + name + '/filters/_package.js', new RegExp(name + "/filters")],
            ['app/modules/' + name + '/directives/_module.js', new RegExp(moduleName + "\.directives")],
            ['app/modules/' + name + '/directives/_package.js', new RegExp(name + "/directives")]
        ];

        this.module.name = name;
        this.module.run({}, function () {
            helpers.assertFile(expected);
            helpers.assertFileContent(expectedContent);
            done();
        });
    });
});
