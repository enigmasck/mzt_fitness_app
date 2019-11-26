const PROGRAM = require('../models/program.model.js');
const MEASUREMENT = require('../models/measurement.model.js');
const SESSION = require('../models/session.model.js');
var mongoose = require('mongoose');

async function getPerformanceIndicators(custId){
    var cntSess = await getTotalCompletedSessions(custId);
    var dIndcImprove = await getImproveDicksonIndic(custId);

    var indicators = {
        cntSession : { 
            indc: cntSess, 
            name: "Total Sessions Completed", 
            msg: "You have completed " + cntSess + " sessions.", 
            displayIndc: cntSess > 0 ? "TRUE":"FALSE" 
        },
        dicksonIndcImprove: {
            indc: dIndcImprove,
            name: "Dickson Indicator Improvement",
            msg: "Your Dickson Indicator has improved by " + dIndcImprove + " units.",
            displayIndc: dIndcImprove > 0 ? "TRUE":"FALSE" 
        }
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
    try{

        var query = {"customer_id":custId};
        var cntSessTot = 0;
        PROGRAM.find(query).then(cntSess => {
            for(var i in cntSess){
                for(var k in cntSess[i].sessions){
                    var indSess = cntSess[i].sessions[k];
                    console.log("session="+indSess);
                    if(indSess.session_type === "regular" && indSess.session_status === "COMPLETED"){
                        cntSessTot++;
                    }
                }
            }
            resolve(cntSessTot);
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

function getImproveDicksonIndic(custId){
    return new Promise(function (resolve, reject) {
        var indicDiff = -1;

    try{
        var query = { "customer_id":custId};
        var sortQuery = {"measurement_date": -1};
        MEASUREMENT.find(query).sort(sortQuery).then(msr => {
            var msrLen = msr.length;
            if(msrLen >= 2){
                indicDiff = msr[msrLen-1].dickson_metric - msr[msrLen-2].dickson_metric;
            }

            resolve(indicDiff);
        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
    }catch(err){
        console.log(err);
        resolve(-1);
    }
    
});
};

function getImprovePushups(custId){
    return new Promise(function (resolve, reject) {
        var indicDiff = -1;
    try{
        var query = {"customer_id":custId, 
            "status": {$in: ["COMPLETED","IN_PROGRESS"]},
            "sessions.$.session_type": "focus",
            "sessions.$.session_type": "COMPLETED",
            "sessions.exercises.result": { $exists: true, $ne: null }
        };
        var sortQuery = {create_timestamp: -1};

        PROGRAM.find(query,{"sessions.$.exercises":1}).sort(sortQuery).then(prog => {
            for(var i in prog){
                console.log("");
            }
            resolve((currFocusSession-prevFocusSession));
        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
    }catch(err){
        console.log(err);
        resolve(-1);
    }
    
});
};

