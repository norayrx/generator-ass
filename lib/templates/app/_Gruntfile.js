module.exports = function (grunt) {
    grunt.initConfig({
        requirejs: {
            "compile-js": {
                options: {
                    baseUrl: "<%=appNamer.getAppDir()%>",
                    mainConfigFile: "<%=appNamer.getAppDir()%>/main.js",
                    name: "main",
                    out: "<%=appNamer.getAppDir()%>/main.min.js",
                    deps: ["lib/requirejs/require"],
                    insertRequire: ["main"],
                    onBuildRead: function (moduleName, path, contents) {
                        var ngmin = require('ngmin');
                        return ngmin.annotate(contents);
                    }
                }
            },
            "compile-css": {
                options: {
                    cssIn: "<%=appNamer.getAppDir()%>/styles/styles.css",
                    out: "<%=appNamer.getAppDir()%>/styles/styles.min.css"
                }
            }
        },
        bower: {
            install: {}
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('install', ['bower']);

    grunt.registerTask('build', ['requirejs']);
}