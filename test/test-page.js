var path = require('path');
var helpers = require('yeoman-generator').test;

describe('angular-require generator:page', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'page'), function (err) {
            if (err) {
                return done(err);
            }

            this.page = helpers.createGenerator('angular-require:page', [
                '../../page'
            ], 'page');
            done();
        }.bind(this));
    });

    it('Should create page', function (done) {
        var name = 'one';

        var expected = [
            'app/templates/views/' + name + '.html',
            'app/styles/views/' + name + '.css'
        ];

        this.page.name = name;
        this.page.run({}, function () {
            helpers.assertFile(expected);
            done();
        });
    });
});
