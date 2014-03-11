require('should');
describe('ModuleHelper', function () {
    var Module = require('../namers').module;
    var ComponentWriter = require('../writers').component
    describe('ModuleHelper root', function () {
        var module = Module('app');
        it('#getAngularName', function (done) {
            module.getAngularName().should.be.equal('App');
            done();
        });

        it('#getRelativePath', function (done) {
            module.getRelativePath().should.be.equal('');
            done();
        });

        it('#getPath', function (done) {
            module.getPath().should.be.equal('app');
            done();
        });

        it('#getAngularComponentsModuleName', function (done) {
            var components = [
                {
                    service: 'App.services'
                },
                {
                    controller: 'App.controllers'
                },
                {
                    filter: 'App.filters'
                },
                {
                    directive: 'App.directives'
                }
            ];
            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getAngularComponentsModuleName(type).should.be.equal(value[type]);
            });
            done();
        });


        it('#getComponentsRelativePath', function (done) {
            var components = [
                {
                    service: 'services'
                },
                {
                    controller: 'controllers'
                },
                {
                    filter: 'filters'
                },
                {
                    directive: 'directives'
                }
            ];
            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getComponentsRelativePath(type).should.be.equal(value[type]);
            });
            done();
        });

        it('#getComponentsPath', function (done) {
            var components = [
                {
                    service: 'app/services'
                },
                {
                    controller: 'app/controllers'
                },
                {
                    filter: 'app/filters'
                },
                {
                    directive: 'app/directives'
                }
            ];
            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getComponentsPath(type).should.be.equal(value[type]);
            });
            done();
        });

        it('#component #getAngularName', function (done) {

            var components = [
                {
                    service: '$name'
                },
                {
                    controller: 'AppNameCtrl'
                },
                {
                    filter: 'name'
                },
                {
                    directive: 'appName'
                }
            ];

            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getComponent(type, 'name').getAngularName().should.be.equal(value[type]);
            });
            done();
        });

        it('#component #getRelativePath', function (done) {
            var components = [
                {
                    service: 'services/name'
                },
                {
                    controller: 'controllers/name'
                },
                {
                    filter: 'filters/name'
                },
                {
                    directive: 'directives/name'
                }
            ];
            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getComponent(type, 'name').getRelativePath().should.be.equal(value[type]);
            });
            done();
        });

        it('#component #getPath', function (done) {
            var components = [
                {
                    service: 'app/services/name'
                },
                {
                    controller: 'app/controllers/name'
                },
                {
                    filter: 'app/filters/name'
                },
                {
                    directive: 'app/directives/name'
                }
            ];
            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getComponent(type, 'name').getPath().should.be.equal(value[type]);
            });
            done();
        });
    });

    describe('ModuleHelper SomeName', function () {
        var module = Module('some name', {isRoot: false});
        it('#getAngularName', function (done) {
            module.getAngularName().should.be.equal('SomeName');
            done();
        });

        it('#getRelativePath', function (done) {
            module.getRelativePath().should.be.equal('modules/some_name');
            done();
        });

        it('#getPath', function (done) {
            module.getPath().should.be.equal('app/modules/some_name');
            done();
        });

        it('#getAngularComponentsModuleName', function (done) {
            var components = [
                {
                    service: 'SomeName.services'
                },
                {
                    controller: 'SomeName.controllers'
                },
                {
                    filter: 'SomeName.filters'
                },
                {
                    directive: 'SomeName.directives'
                }
            ];
            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getAngularComponentsModuleName(type).should.be.equal(value[type]);
            });
            done();
        });


        it('#getComponentsRelativePath', function (done) {
            var components = [
                {
                    service: 'modules/some_name/services'
                },
                {
                    controller: 'modules/some_name/controllers'
                },
                {
                    filter: 'modules/some_name/filters'
                },
                {
                    directive: 'modules/some_name/directives'
                }
            ];
            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getComponentsRelativePath(type).should.be.equal(value[type]);
            });
            done();
        });

        it('#getComponentsPath', function (done) {
            var components = [
                {
                    service: 'app/modules/some_name/services'
                },
                {
                    controller: 'app/modules/some_name/controllers'
                },
                {
                    filter: 'app/modules/some_name/filters'
                },
                {
                    directive: 'app/modules/some_name/directives'
                }
            ];
            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getComponentsPath(type).should.be.equal(value[type]);
            });
            done();
        });

        it('#component #getAngularName', function (done) {

            var components = [
                {
                    service: '$name'
                },
                {
                    controller: 'SomeNameNameCtrl'
                },
                {
                    filter: 'name'
                },
                {
                    directive: 'someNameName'
                }
            ];

            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getComponent(type, 'name').getAngularName().should.be.equal(value[type]);
            });
            done();
        });

        it('#component #getRelativePath', function (done) {
            var components = [
                {
                    service: 'modules/some_name/services/name'
                },
                {
                    controller: 'modules/some_name/controllers/name'
                },
                {
                    filter: 'modules/some_name/filters/name'
                },
                {
                    directive: 'modules/some_name/directives/name'
                }
            ];
            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getComponent(type, 'name').getRelativePath().should.be.equal(value[type]);
            });
            done();
        });

        it('#component #getPath', function (done) {
            var components = [
                {
                    service: 'app/modules/some_name/services/name'
                },
                {
                    controller: 'app/modules/some_name/controllers/name'
                },
                {
                    filter: 'app/modules/some_name/filters/name'
                },
                {
                    directive: 'app/modules/some_name/directives/name'
                }
            ];
            components.forEach(function (value) {
                var type = Object.keys(value)[0];
                module.getComponent(type, 'name').getPath().should.be.equal(value[type]);
            });
            done();
        });
    });

    describe('ComponentWriter', function () {
        var module = Module('app');
        var componentWriter = ComponentWriter();

        it('#addRequire', function (done) {
            var package = 'define(function(require){\n' +
                '\trequire("controllers/module");\n' +
                '});';
            var expectedPackage = 'define(function(require){\n' +
                '\trequire("controllers/module");\n' +
                '\trequire("controllers/name");\n' +
                '});';
            componentWriter.addRequire(package, "controllers/name").should.be.equal(expectedPackage);
            done();
        });

        it('#addImport', function (done) {
            var package = '@import url("../lib/bootstrap/dist/css/bootstrap.css");';
            var expectedPackage = '@import url("../lib/bootstrap/dist/css/bootstrap.css");\n' +
                '@import url("controllers/name");';
            componentWriter.addImport(package, "controllers/name").should.be.equal(expectedPackage);
            done();
        });

        it('#addRoute', function (done) {
            var package = '["$provide", "$routeProvider", "$httpProvider", function ($provide, $routeProvider, $httpProvider) {\n' +
                '$routeProvider\n' +
                '\t.when("/", {\n' +
                '\t\tcontroller:"MainController",\n' +
                '\t\ttemplate:require("text!templates/views/main.html")\n' +
                '\t});\n' +
                '})';
            var expectedPackage = '["$provide", "$routeProvider", "$httpProvider", function ($provide, $routeProvider, $httpProvider) {\n' +
                '$routeProvider\n' +
                '\t.when("/test", {\n' +
                '\t\tcontroller:"TestController",\n' +
                '\t\ttemplate:require("text!templates/views/test.html")\n' +
                '\t})\n' +
                '\t.when("/", {\n' +
                '\t\tcontroller:"MainController",\n' +
                '\t\ttemplate:require("text!templates/views/main.html")\n' +
                '\t});\n' +
                '})';
            componentWriter.addRoute(package, "test", "TestController", "templates/views/test.html").should.be.equal(expectedPackage);
            done();
        });
    });
})
;