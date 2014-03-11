module.exports = (function () {
    var utils = require('../utils');

    var Writer = function () {

    }

    Writer.prototype.write=function(packageString,packageRegex,content){
        return utils.insertIntoString(packageString, packageRegex, content);
    }

    return Writer;
})();