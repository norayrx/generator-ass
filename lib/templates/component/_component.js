define(function (require) {
    require("<%=moduleNamer.getComponentsRelativePath(componentType)%>/_module");

    var angular = require("angular");

    angular.module("<%=moduleNamer.getAngularComponentsModuleName(componentType)%>").<%=componentNamer.getAngularFactory()%>("<%=componentNamer.getAngularName()%>", function ($scope) {

    });
});