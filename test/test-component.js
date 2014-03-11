/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var _s = require('underscore.string');
var helpers = require('yeoman-generator').test;

describe('root', function () {
    describe('angular-require generator:controller', function () {
        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'controller'), function (err) {
                if (err) {
                    return done(err);
                }

                this.controller = helpers.createGenerator('angular-require:controller', [
                    '../../controller'
                ], 'controller');
                done();
            }.bind(this));
        });

        it('Should create controller', function (done) {
            var name = 'one';
            var controllerName = name.charAt(0).toUpperCase() + name.slice(1);

            var expected = [
                'app/controllers/' + name + '.js'
            ];

            var expectedContent = [
                ['app/controllers/' + name + '.js', new RegExp(controllerName)],
            ];

            this.controller.name = name;

            helpers.mockPrompt(this.controller, {
                'moduleName': 'root'
            });
            this.controller.run({}, function () {
                helpers.assertFile(expected);
                helpers.assertFileContent(expectedContent);
                done();
            });
        });
    });

    describe('angular-require generator:service', function () {
        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'service'), function (err) {
                if (err) {
                    return done(err);
                }

                this.service = helpers.createGenerator('angular-require:service', [
                    '../../service'
                ], 'service');
                done();
            }.bind(this));
        });

        it('Should create service', function (done) {
            var name = 'one';

            var expected = [
                'app/services/' + name + '.js'
            ];

            var expectedContent = [
                ['app/services/' + name + '.js', new RegExp("\\$" + name)],
            ];

           this.service.name = name;

            helpers.mockPrompt(this.service, {
                'moduleName': 'root'
            });
            this.service.run({}, function () {
                helpers.assertFile(expected);
                helpers.assertFileContent(expectedContent);
                done();
            });
        });
    });

    describe('angular-require generator:directive', function () {
        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'directive'), function (err) {
                if (err) {
                    return done(err);
                }

                this.directive = helpers.createGenerator('angular-require:directive', [
                    '../../directive'
                ], 'directive');
                done();
            }.bind(this));
        });

        it('Should create directive', function (done) {
            var name = 'one';

            var expected = [
                'app/directives/' + name + '.js'
            ];

            var expectedContent = [
                ['app/directives/' + name + '.js', new RegExp('app' + _s.capitalize(name))],
            ];

            this.directive.name = name;

            helpers.mockPrompt(this.directive, {
                'moduleName': 'root'
            });
            this.directive.run({}, function () {
                helpers.assertFile(expected);
                helpers.assertFileContent(expectedContent);
                done();
            });
        });
    });

    describe('angular-require generator:filter', function () {
        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'filter'), function (err) {
                if (err) {
                    return done(err);
                }

                this.filter = helpers.createGenerator('angular-require:filter', [
                    '../../filter'
                ], 'filter');
                done();
            }.bind(this));
        });

        it('Should create filter', function (done) {
            var name = 'one';

            var expected = [
                'app/filters/' + name + '.js'
            ];

            var expectedContent = [
                ['app/filters/' + name + '.js', new RegExp(name)],
            ];

            this.filter.name = name;

            helpers.mockPrompt(this.filter, {
                'moduleName': 'root'
            });
            this.filter.run({}, function () {
                helpers.assertFile(expected);
                helpers.assertFileContent(expectedContent);
                done();
            });
        });
    });
});

describe('SomeModule', function () {
    describe('angular-require generator:controller', function () {
        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'controller'), function (err) {
                if (err) {
                    return done(err);
                }

                this.controller = helpers.createGenerator('angular-require:controller', [
                    '../../controller'
                ], 'controller');
                done();
            }.bind(this));
        });

        it('Should create controller', function (done) {
            var name = 'one';
            var controllerName = name.charAt(0).toUpperCase() + name.slice(1);

            var expected = [
                'app/modules/some_module/controllers/' + name + '.js'
            ];

            var expectedContent = [
                ['app/modules/some_module/controllers/' + name + '.js', new RegExp('SomeModule'+controllerName)],
            ];

            this.controller.name = name;

            helpers.mockPrompt(this.controller, {
                'moduleName': 'SomeModule'
            });
            this.controller.run({}, function () {
                helpers.assertFile(expected);
                helpers.assertFileContent(expectedContent);
                done();
            });
        });
    });

    describe('angular-require generator:service', function () {
        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'service'), function (err) {
                if (err) {
                    return done(err);
                }

                this.service = helpers.createGenerator('angular-require:service', [
                    '../../service'
                ], 'service');
                done();
            }.bind(this));
        });

        it('Should create service', function (done) {
            var name = 'one';

            var expected = [
                'app/modules/some_module/services/' + name + '.js'
            ];

            var expectedContent = [
                ['app/modules/some_module/services/' + name + '.js', new RegExp("\\$" + name)],
            ];

           this.service.name = name;

            helpers.mockPrompt(this.service, {
                'moduleName': 'SomeModule'
            });
            this.service.run({}, function () {
                helpers.assertFile(expected);
                helpers.assertFileContent(expectedContent);
                done();
            });
        });
    });

    describe('angular-require generator:directive', function () {
        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'directive'), function (err) {
                if (err) {
                    return done(err);
                }

                this.directive = helpers.createGenerator('angular-require:directive', [
                    '../../directive'
                ], 'directive');
                done();
            }.bind(this));
        });

        it('Should create directive', function (done) {
            var name = 'one';

            var expected = [
                'app/modules/some_module/directives/' + name + '.js'
            ];

            var expectedContent = [
                ['app/modules/some_module/directives/' + name + '.js', new RegExp('someModule' + _s.capitalize(name))],
            ];

           this.directive.name = name;

            helpers.mockPrompt(this.directive, {
                'moduleName': 'SomeModule'
            });
            this.directive.run({}, function () {
                helpers.assertFile(expected);
                helpers.assertFileContent(expectedContent);
                done();
            });
        });
    });

    describe('angular-require generator:filter', function () {
        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'filter'), function (err) {
                if (err) {
                    return done(err);
                }

                this.filter = helpers.createGenerator('angular-require:filter', [
                    '../../filter'
                ], 'filter');
                done();
            }.bind(this));
        });

        it('Should create filter', function (done) {
            var name = 'one';

            var expected = [
                'app/modules/some_module/filters/' + name + '.js'
            ];

            var expectedContent = [
                ['app/modules/some_module/filters/' + name + '.js', new RegExp(name)],
            ];

           this.filter.name = name;

            helpers.mockPrompt(this.filter, {
                'moduleName': 'SomeModule'
            });
            this.filter.run({}, function () {
                helpers.assertFile(expected);
                helpers.assertFileContent(expectedContent);
                done();
            });
        });
    });
});