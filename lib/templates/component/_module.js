define(function (require) {
    var angular = require("angular");
    angular.module("<%=moduleNamer.getAngularComponentsModuleName(componentType)%>", []);
});