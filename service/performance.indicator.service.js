require('../service/checkNull.js');
require('../helpers/performance.indicators.helpers.js');
const ERROR_MSG = require('../message.strings/error.strings.js');

exports.findAll = function (custId) {
    return new Promise(function (resolve, reject) {
        try{
            console.log("custId = " + custId);
            var perfIndic = getPerformanceIndicators(custId);
            resolve(perfIndic);
        }catch(err){
            reject(ERROR_MSG.INTERNAL_ERROR + err);
        }
    });
};