const PROGRAM = require('../models/program.model.js');
const MEASUREMENT = require('../models/measurement.model.js');
const SESSION = require('../models/session.model.js');
var mongoose = require('mongoose');
var utils = require('../utils/logger.js');

async function getPerformanceIndicators(custId){
    var cntSess = await getTotalCompletedSessions(custId);
    var dIndcImprove = await getImproveDicksonIndic(custId);
    var improvePushups = await getImprovePushups(custId);

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
        },
        pushupsImprove:{improvePushups}
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
        console.log('customer Id: '+custId);
        var pushups = [];
        var custIdObj = mongoose.Types.ObjectId(custId);
        var aggQuery = [
            {$unwind:{path: "$sessions", includeArrayIndex: "SIndex"}},
            {$unwind: {path: "$sessions.exercises", includeArrayIndex: "EIndex" }},

            {$match: {"sessions.session_type":"focus", "status": "COMPLETED" || "IN_PROGRESS", 
                    "sessions.session_status": "COMPLETED", "customer_id": custIdObj}},
            {$group: {_id:"$SIndex", exercise: {$push:{index:"$EIndex",result: "$sessions.exercises.result"}}}},
            {$project: {"exercise": 1, _id: 1}}];
        // Get the program
        PROGRAM.aggregate(aggQuery).then(prog => {
            /*console.log("prog="+prog);
            for(var i in prog){
                console.log("i="+i);
                var exercises = prog[i].exercise;
                for(var k in exercises){
                    console.log("log k="+k);
                    console.log("exercises[k]="+exercises[k]);
                    if(exercises[k].result === "Half push-ups"){
                        pushups.append(exercises[k].result.result);
                    }
                }
                
            }*/
            if (!prog) {
                reject("Program template not found with id " + custId);
            } else {
                resolve(prog);
            }
        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
    });
};

/*
 * Work in Progress: Not sure if I will get this working by deadline, not sure 
 * if it's worth the effort. For now it's returning -1 and will not be displayed 
 */
/*function getImprovePushups(custId){
    return new Promise(function (resolve, reject) {
    
    console.log("In getImprovePushups");
    var currPush = -1;
    var prevPush = -1;
    try{
        var query = {"customer_id":custId};
        
        var sortQuery = {measurement_date: -1};
        
        MEASUREMENT.find(query).sort(sortQuery).then(msr => {         
            console.log("msr="+msr);
            if(msr.length >= 2){
                var sess = getSession(msr.session_id);
                if(sess !== -1){
                    console.log("sess="+sess);
                    var curr = msr[0].sessions;
                    var prev = msr[1].sessions;
                }
            }
        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
        var query = {"customer_id":custId, 
            "status": {$in: ["COMPLETED","IN_PROGRESS"]},
            "sessions": {$elemMatch: { session_type: "focus", session_status: "COMPLETED" }} 
            //"sessions.session_status": "COMPLETED"
            //"sessions.exercises.name": "Half push-ups",
            //"sessions.exercises.result": { $exists: true, $ne: null }
        };
        var sortQuery = {create_timestamp: -1};
        var projectQuery = {"sessions":1};*/

        /*PROGRAM.find(query,projectQuery).sort(sortQuery).then(prog => {
            console.log("prog="+prog);
            for(var i in prog){
                var sess = prog[i].sessions;
                console.log("sess="+sess.status);
                if(sess.session_type === "focus" && sess.session_status === "COMPLETED"){
                    for(var k in sess){
                        var ex = sess[k].exercises;
                        for(var r in ex){
                            if(ex[r].name === "Half push-ups" && currPush === -1 && prevPush === -1){
                                currPush = ex[r].result;
                            }
                            if(ex[r].name === "Half push-ups" && currPush !== -1 && prevPush === -1){
                                prevPush = ex[r].result;
                            }
                        }
                    }
                }
            }
            
            if(currPush !== -1 && prevPush !== -1)
                resolve(currPush - prevPush);
            else
                resolve(-1);
            resolve(-1);

        }).catch(err => {
            console.log(err);
            resolve(-1);
        });
        resolve(-1);
    }catch(err){
        console.log(err);
        resolve(-1);
    }
    
});
};*/

