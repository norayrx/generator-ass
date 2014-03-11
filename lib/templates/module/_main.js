define(function (require, exports, module) {
    require("<%=moduleNamer.getComponentsRelativePath("controller")%>/_package");
    require("<%=moduleNamer.getComponentsRelativePath("service")%>/_package");
    require("<%=moduleNamer.getComponentsRelativePath("directive")%>/_package");
    require("<%=moduleNamer.getComponentsRelativePath("filter")%>/_package");

    var angular = require("angular");

    return angular.module("<%=moduleNamer.getAngularName()%>", ["<%=moduleNamer.getAngularComponentsModuleName("controller")%>", "<%=moduleNamer.getAngularComponentsModuleName("service")%>", "<%=moduleNamer.getAngularComponentsModuleName("directive")%>", "<%=moduleNamer.getAngularComponentsModuleName("filter")%>"]);

});