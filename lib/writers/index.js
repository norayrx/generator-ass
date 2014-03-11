module.exports = (function () {
    var ComponentWriter = require('./component');

    return{
        component: function () {
            return new ComponentWriter();
        }
    };
})();