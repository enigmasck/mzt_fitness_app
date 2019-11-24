const PROGRAM = require('../models/program.model.js');
const SESSION = require('../models/session.model.js');
var mongoose = require('mongoose');

async function getPerformanceIndicators(custId){
    console.log("getPerformanceIndicators");
    var cntSess = await getTotalCompletedSessions(custId);
    console.log("cntSess = " + cntSess);
    var indicators = {
        cntSession : cntSess
    };
    
    return indicators;
}
global.getPerformanceIndicators = getPerformanceIndicators;

/*
 * @function: getTotalCompletedSessions
 * @arguments: {string} custId
 * @description: Gets all the completed sessions for a given customer id
 * @returns {integer} : an integer representing the total number of sessions completed
 * @error:
 */
function getTotalCompletedSessions(custId){
    return new Promise(function (resolve, reject) {
    console.log("getTotalCompletedSessions");
    try{
        var query = [
            {
                $match: {"customer_id": mongoose.Types.ObjectId(custId), "sessions.session_status": "COMPLETED"}
            },
            {
                $group: {
                    _id: null,
                    count: {$sum: 1}
                }
            }
        ];
        PROGRAM.aggregate(query).then(cntSess => {
            console.log("cntSess="+cntSess);
            console.log("keys="+Object.keys(cntSess));
            resolve(cntSess[0].count);
        }).catch(err => {
            resolve(0);
        });
    }catch(err){
        console.log(err);
        resolve(0);
    }
});
};
global.getTotalCompletedSessions = getTotalCompletedSessions;

