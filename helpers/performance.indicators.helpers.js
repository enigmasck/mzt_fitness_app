const PROGRAM = require('../models/program.model.js');
const MEASUREMENT = require('../models/measurement.model.js');
const SESSION = require('../models/session.model.js');
const OFFER_TRANS = require('../models/offer.transaction.model.js');
var mongoose = require('mongoose');
var utils = require('../utils/logger.js');

/*
 * @function: getPerformanceIndicators
 * @arguments: {string} custId
 * @description: Gets all performance indicators for a given client
 * @returns {JSON} : A JSON string with all performance indicators name, message, value
 * and if the performance indicator should be displayed (shows improvement)
 * @error: null - any errors handled by the controller
 */
async function getPerformanceIndicators(custId){
    var cntSess = await getTotalCompletedSessions(custId);
    var dIndcImprove = await getImproveDicksonIndic(custId);
    var improvePushups = await getImprovePushups(custId);
    var improvePlanks = await getImprovePlanks(custId);
    var improveLunges = await getImproveLunges(custId);
    var improveCrunches = await getImproveCrunches(custId);
    var improveSquats = await getImproveSquats(custId);
    var improveTriceps = await getImproveTriceps(custId);
    var lastChallengePts = await getLastChallenge(custId);
    
    var indicators = {
        cntSession : { 
            indc: cntSess, 
            name: "Total Sessions Completed", 
            msg: "You have completed " + cntSess + " sessions.", 
            displayIndc: cntSess > 0 ? "TRUE":"FALSE" 
        },
        dicksonIndcImprove: {
            indc: dIndcImprove.toFixed(2),
            name: "Dickson Indicator Improvement",
            msg: "Your Dickson Indicator has improved by " + dIndcImprove.toFixed(2) + " units.",
            displayIndc: dIndcImprove > 0 ? "TRUE":"FALSE" 
        },
        planksImprove: {
            indc: improvePlanks,
            name: "Planks Improvement",
            msg: "The number of planks you can do has improved by " + improvePlanks + " planks.",
            displayIndc: improvePlanks > 0 ? "TRUE":"FALSE" 
        },
        lungesImprove: {
            indc: improveLunges,
            name: "Lunges Improvement",
            msg: "The number of lunges you can do has improved by " + improveLunges + " lunges.",
            displayIndc: improveLunges > 0 ? "TRUE":"FALSE" 
        },
        crunchesImprove: {
            indc: improveCrunches,
            name: "Crunches Improvement",
            msg: "The number of crunches you can do has improved by " + improveCrunches + " crunches.",
            displayIndc: improveCrunches > 0 ? "TRUE":"FALSE" 
        },
        pushupsImprove: {
            indc: improvePushups,
            name: "Pushups Improvement",
            msg: "The number of pushups you can do has improved by " + improvePushups + " pushups.",
            displayIndc: improvePushups > 0 ? "TRUE":"FALSE" 
        },
        squatsImprove: {
            indc: improveSquats,
            name: "Squats Improvement",
            msg: "The number of squats you can do has improved by " + improveSquats + " squats.",
            displayIndc: improveSquats > 0 ? "TRUE":"FALSE" 
        },
        tricepsImprove: {
            indc: improveTriceps,
            name: "Tricep Dips Improvement",
            msg: "The number of tricep dips you can do has improved by " + improveTriceps + " tricep dips.",
            displayIndc: improveTriceps > 0 ? "TRUE":"FALSE" 
        },
        lastChallengePtsEarned: {
            indc: lastChallengePts[1],
            name: "Last Challenge Points Earned",
            msg: "In your last challenge, " + lastChallengePts[0] + ", you earned " + lastChallengePts[1] + " points!!!",
            displayIndc: lastChallengePts[1] > 0 ? "TRUE":"FALSE" 
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
 * @error: {integer} : return an integer of -1.
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
                    if(indSess.session_type === "regular" && indSess.session_status === "COMPLETED"){
                        cntSessTot++;
                    }
                }
            }
            resolve(cntSessTot);
        }).catch(err => {
            resolve(-1);
        });
    }catch(err){
        console.log(err);
        reject(-1);
    }
});
};
global.getTotalCompletedSessions = getTotalCompletedSessions;

/*
 * @function: getImproveDicksonIndic
 * @arguments: {string} custId
 * @description: Gets a single value which displays the improvement of a client's
 * dickson indicator improvement. It takes the last focus session and the subtracts the baseline
 * measurement.
 * @returns {integer} : an integer representing the total number of sessions completed
 * @error: {integer} : return an integer of -1.
 */
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

/*
 * @function: getImprovePlanks
 * @arguments: {string} custId
 * @description: Gets a single value which displays the improvement of a client's
 * planks improvement. It takes the last focus session and the subtracts the baseline
 * measurement.
 * @returns {integer} : an integer representing the total number of planks 
 * improved between focus sessions
 * @error: {integer} : return an integer of -1.
 */
function getImprovePlanks(custId){
    return new Promise(function (resolve, reject) {
        console.log('customer Id: '+custId);
        var custIdObj = mongoose.Types.ObjectId(custId);
        var aggQuery = [
            {$unwind:{path: "$sessions", includeArrayIndex: "SIndex"}},
            {$unwind: {path: "$sessions.exercises", includeArrayIndex: "EIndex" }},

            {$match: {"sessions.session_type":"focus", "status": {$in:["COMPLETED","IN_PROGRESS"]}, 
                    "sessions.session_status": "COMPLETED", "sessions.exercises.name": "Plank","customer_id": custIdObj}},
            // Sorted by SIndex DESC
            {$sort:{"SIndex": 1}},
            {$group: {_id:{program: "$title", status: "$status"}, exercise: {$push:"$sessions.exercises.result"}}},
            {$project: {"exercise": 1}}];
        // Get the program
        PROGRAM.aggregate(aggQuery).then(prog => {
            if (!prog) {
                reject(-1);
            } else {
                var diff = prog[0]["exercise"][2] - prog[0]["exercise"][0];
                resolve(diff);
            }
        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
    });
};

/*
 * @function: getImproveLunges
 * @arguments: {string} custId
 * @description: Gets a single value which displays the improvement of a client's
 * lunges improvement. It takes the last focus session and the subtracts the baseline
 * measurement.
 * @returns {integer} : an integer representing the total number of lunges 
 * improved between focus sessions
 * @error: {integer} : return an integer of -1.
 */
function getImproveLunges(custId){
    return new Promise(function (resolve, reject) {
        console.log('customer Id: '+custId);
        var custIdObj = mongoose.Types.ObjectId(custId);
        var aggQuery = [
            {$unwind:{path: "$sessions", includeArrayIndex: "SIndex"}},
            {$unwind: {path: "$sessions.exercises", includeArrayIndex: "EIndex" }},

            {$match: {"sessions.session_type":"focus", "status": {$in:["COMPLETED","IN_PROGRESS"]}, 
                    "sessions.session_status": "COMPLETED", "sessions.exercises.name": "Lunges","customer_id": custIdObj}},
            // Sorted by SIndex DESC
            {$sort:{"SIndex": 1}},
            {$group: {_id:{program: "$title", status: "$status"}, exercise: {$push:"$sessions.exercises.result"}}},
            {$project: {"exercise": 1}}];
        // Get the program
        PROGRAM.aggregate(aggQuery).then(prog => {
            if (!prog) {
                reject(-1);
            } else {
                var diff = prog[0]["exercise"][2] - prog[0]["exercise"][0];
                resolve(diff);
            }
        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
    });
};

/*
 * @function: getImproveCrunches
 * @arguments: {string} custId
 * @description: Gets a single value which displays the improvement of a client's
 * crunches improvement. It takes the last focus session and the subtracts the baseline
 * measurement.
 * @returns {integer} : an integer representing the total number of crunches 
 * improved between focus sessions
 * @error: {integer} : return an integer of -1.
 */
function getImproveCrunches(custId){
    return new Promise(function (resolve, reject) {
        console.log('customer Id: '+custId);
        var custIdObj = mongoose.Types.ObjectId(custId);
        var aggQuery = [
            {$unwind:{path: "$sessions", includeArrayIndex: "SIndex"}},
            {$unwind: {path: "$sessions.exercises", includeArrayIndex: "EIndex" }},

            {$match: {"sessions.session_type":"focus", "status": {$in:["COMPLETED","IN_PROGRESS"]}, 
                    "sessions.session_status": "COMPLETED", "sessions.exercises.name": "Crunches","customer_id": custIdObj}},
            // Sorted by SIndex DESC
            {$sort:{"SIndex": 1}},
            {$group: {_id:{program: "$title", status: "$status"}, exercise: {$push:"$sessions.exercises.result"}}},
            {$project: {"exercise": 1}}];
        // Get the program
        PROGRAM.aggregate(aggQuery).then(prog => {
            if (!prog) {
                reject(-1);
            } else {
                var diff = prog[0]["exercise"][2] - prog[0]["exercise"][0];
                resolve(diff);
            }
        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
    });
};

/*
 * @function: getImprovePushups
 * @arguments: {string} custId
 * @description: Gets a single value which displays the improvement of a client's
 * pushups improvement. It takes the last focus session and the subtracts the baseline
 * measurement.
 * @returns {integer} : an integer representing the total number of pushups 
 * improved between focus sessions
 * @error: {integer} : return an integer of -1.
 */
function getImprovePushups(custId){
    return new Promise(function (resolve, reject) {
        console.log('customer Id: '+custId);
        var custIdObj = mongoose.Types.ObjectId(custId);
        var aggQuery = [
            {$unwind:{path: "$sessions", includeArrayIndex: "SIndex"}},
            {$unwind: {path: "$sessions.exercises", includeArrayIndex: "EIndex" }},

            {$match: {"sessions.session_type":"focus", "status": {$in:["COMPLETED","IN_PROGRESS"]}, 
                    "sessions.session_status": "COMPLETED", "sessions.exercises.name": "Half push-ups","customer_id": custIdObj}},
            // Sorted by SIndex DESC
            {$sort:{"SIndex": 1}},
            {$group: {_id:{program: "$title", status: "$status"}, exercise: {$push:"$sessions.exercises.result"}}},
            {$project: {"exercise": 1}}];
        // Get the program
        PROGRAM.aggregate(aggQuery).then(prog => {
            if (!prog) {
                reject(-1);
            } else {
                var diff = prog[0]["exercise"][2] - prog[0]["exercise"][0];
                resolve(diff);
            }
        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
    });
};

/*
 * @function: getImproveSquats
 * @arguments: {string} custId
 * @description: Gets a single value which displays the improvement of a client's
 * squats improvement. It takes the last focus session and the subtracts the baseline
 * measurement.
 * @returns {integer} : an integer representing the total number of squats 
 * improved between focus sessions
 * @error: {integer} : return an integer of -1.
 */
function getImproveSquats(custId){
    return new Promise(function (resolve, reject) {
        console.log('customer Id: '+custId);
        var custIdObj = mongoose.Types.ObjectId(custId);
        var aggQuery = [
            {$unwind:{path: "$sessions", includeArrayIndex: "SIndex"}},
            {$unwind: {path: "$sessions.exercises", includeArrayIndex: "EIndex" }},

            {$match: {"sessions.session_type":"focus", "status": {$in:["COMPLETED","IN_PROGRESS"]}, 
                    "sessions.session_status": "COMPLETED", "sessions.exercises.name": "Squats","customer_id": custIdObj}},
            // Sorted by SIndex DESC
            {$sort:{"SIndex": 1}},
            {$group: {_id:{program: "$title", status: "$status"}, exercise: {$push:"$sessions.exercises.result"}}},
            {$project: {"exercise": 1}}];
        // Get the program
        PROGRAM.aggregate(aggQuery).then(prog => {
            if (!prog) {
                reject(-1);
            } else {
                var diff = prog[0]["exercise"][2] - prog[0]["exercise"][0];
                resolve(diff);
            }
        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
    });
};

/*
 * @function: getImproveTriceps
 * @arguments: {string} custId
 * @description: Gets a single value which displays the improvement of a client's
 * tricep dips improvement. It takes the last focus session and the subtracts the baseline
 * measurement.
 * @returns {integer} : an integer representing the total number of tricep dips 
 * improved between focus sessions
 * @error: {integer} : return an integer of -1.
 */
function getImproveTriceps(custId){
    return new Promise(function (resolve, reject) {
        console.log('customer Id: '+custId);
        var custIdObj = mongoose.Types.ObjectId(custId);
        var aggQuery = [
            {$unwind:{path: "$sessions", includeArrayIndex: "SIndex"}},
            {$unwind: {path: "$sessions.exercises", includeArrayIndex: "EIndex" }},

            {$match: {"sessions.session_type":"focus", "status": {$in:["COMPLETED","IN_PROGRESS"]}, 
                    "sessions.session_status": "COMPLETED", "sessions.exercises.name": "Triceps dips","customer_id": custIdObj}},
            // Sorted by SIndex DESC
            {$sort:{"SIndex": 1}},
            {$group: {_id:{program: "$title", status: "$status"}, exercise: {$push:"$sessions.exercises.result"}}},
            {$project: {"exercise": 1}}];
        // Get the program
        PROGRAM.aggregate(aggQuery).then(prog => {
            if (!prog) {
                reject(-1);
            } else {
                var diff = prog[0]["exercise"][2] - prog[0]["exercise"][0];
                resolve(diff);
            }
        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
    });
};

/*
 * @function: getLastChallenge
 * @arguments: {string} custId
 * @description: Gets an array of challenge of name and total points earned in
 * the client's last challenge
 * @returns {array} : an integer representing the total points earned and the 
 * name of the challenge where the points were earned
 * @error: {array} : return  '' for challenge name and -1 for points earned
 */
function getLastChallenge(custId){
    return new Promise(function (resolve, reject) {
        console.log('customer Id: '+custId);
        var custIdObj = mongoose.Types.ObjectId(custId);
        var query = {
            customer_id: custIdObj,
            transaction_type : {$in: 'EARNED'}
        };
        var sortQuery = {create_timestamp: 1};
        OFFER_TRANS.find(query).populate({path: 'challenge_id'}).sort(sortQuery).then(offerTrans => {
            var name = offerTrans[0].challenge_id.name;
            var pts = offerTrans[0].points;
            console.log("offerTrans"+offerTrans);
            resolve([name,pts]);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject(['',-1]);
            }
            reject(['',-1]);
        }); 
    });
};