require.config({
    baseUrl: "<%=appNamer.getAppDir()%>",
    paths: {
        "jquery": "lib/jquery/dist/jquery",
        "angular": "lib/angular/angular",
        "text": "lib/requirejs-text/text"
    },
    shim: {
        "jquery": {
            exports: "jQuery"
        },
        "angular": {
            exports: "angular",
            "deps": ["jquery"]
        },
        "lib/angular-route/angular-route": {
            "deps": ["angular"]
        }
    },
    config: {
        "services": {
            apiUrl: "http://localhost/api"
        }
    }
});

define(function (require) {
    require("<%=appNamer.getComponentsRelativePath("controller")%>/_package");
    require("<%=appNamer.getComponentsRelativePath("service")%>/_package");
    require("<%=appNamer.getComponentsRelativePath("filter")%>/_package");
    require("<%=appNamer.getComponentsRelativePath("directive")%>/_package");
    require("lib/angular-route/angular-route");

    var angular = require("angular");

    var app = angular.module("<%=appNamer.getAngularName()%>", ["<%=appNamer.getAngularComponentsModuleName("controller")%>", "<%=appNamer.getAngularComponentsModuleName("service")%>", "<%=appNamer.getAngularComponentsModuleName("directive")%>", "<%=appNamer.getAngularComponentsModuleName("filter")%>", "ngRoute"],
        ["$provide", "$routeProvider", "$httpProvider", function ($provide, $routeProvider, $httpProvider) {
            $routeProvider;

            $httpProvider.interceptors.push(function () {
                return {
                    "request": function (config) {
                        return config;
                    },
                    "response": function (response) {
                        return response;
                    }
                }
            });
        }]);

    app.run(function ($rootScope) {
        $rootScope.$safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == "$apply" || phase == "$digest") {
                if (fn && (typeof(fn) === "function")) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

    });

    angular.bootstrap(document, ["<%=appNamer.getAngularName()%>"]);
});