var path = require('path');
var helpers = require('yeoman-generator').test;

describe('angular-require generator:module', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'app'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('angular-require:app', [
                '../../app'
            ], 'app');
            done();
        }.bind(this));
    });

    it('Should create module', function (done) {

        var expected = [
            '.bowerrc',
            'bower.json',
            'Gruntfile.js',
            'index.html',
            'package.json',
            'app',
            'app/controllers',
            'app/controllers/_package.js',
            'app/services',
            'app/services/_package.js',
            'app/filters',
            'app/filters/_package.js',
            'app/directives',
            'app/directives/_package.js',
            'app/images',
            'app/lib',
            'app/styles',
            'app/styles/styles.css',
            'app/styles/directives',
            'app/styles/views',
            'app/templates',
            'app/templates/directives',
            'app/templates/views',
        ];

        var expectedContent = [
            ['app/main.js', /App/],
            ['app/controllers/_module.js', /App\.controllers/],
            ['app/services/_module.js', /App\.services/],
            ['app/filters/_module.js', /App\.filters/],
            ['app/directives/_module.js', /App\.directives/]
        ];

        helpers.mockPrompt(this.app, {
            'appName': 'app'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFile(expected);
            helpers.assertFileContent(expectedContent);
            done();
        });
    });
});
