module.exports = (function () {
    var _s = require('underscore.string');
    var fs = require('fs');

    var readFile = function (path) {
        return fs.readFileSync(path, 'utf8');
    }

    var insertIntoString = function (string, afterRegex, substring) {
        var matchResult = string.match(afterRegex);
        if (matchResult === null)return string;
        var substringByRegex = matchResult[0];
        var start = string.indexOf(substringByRegex) + substringByRegex.length;
        return string.slice(0, start) + substring + string.slice(start);
    }
    return{
        insertIntoString: insertIntoString,
        readFile: readFile
    };
})();