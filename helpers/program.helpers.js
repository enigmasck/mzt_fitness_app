/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const Program = require('../models/program.model.js');
const Session = require('../models/session.model.js');
const ProgramTemp = require('../models/programTemplate.model.js');
const SessionTemplate = require('../models/sessionTemplate.model.js');
const Exercise = require('../models/exercise.model.js');

async function createProgram(progTempId, custId, coachId){
    
    console.log('----------START CREATE PROG------------');
    
    var progStatus = await checkCustomerProgramStatus(custId);
    console.log('progStatus = ' + progStatus);
    
    if(progStatus === 'NONE'){
        var tempProg = await getTempProg(progTempId);
        console.log('tempProg = ' + tempProg);
        
        var tempSessId = await getTempSessionId(progTempId);
        console.log('tempSessId = ' + tempSessId);
        
        var tempSessData = await getTempSessionData(tempSessId);
        if(Array.isArray(tempSessData)){
            console.log(' IS ARRAY tempSessData = ' + tempSessData);
        }else{
            console.log('tempSessData = ' + tempSessData);
        }

        for(var sess in tempSessData){
            console.log('sess = ' + sess);
            console.log('exercise ids = ' + tempSessData[sess].exercises);
            var exerciseData = await getExercises(tempSessData[sess].exercises);
            console.log('exerciseData=' + exerciseData);
            tempSessData[sess].exercises = exerciseData;
        }
        console.log('tempSessData with exercise data= ' + tempSessData);
        console.log('tempProg before new program= ' + tempProg);
        const program = new Program({
            title: tempProg.title,
            type: tempProg['type'],
            description: tempProg['description'],
            duration: tempProg['duration'],
            status: 'IN_PROGRESS',
            customer_id: custId,
            coach_id: coachId,
            sessions: tempSessData
        });

        console.log('BEFORE SAVE program = ' + program);
        
        program.save().then(data => {
            console.log('program BEFORE RETURN = ' + program);
            return program;
        }).catch(err => {
           console.log('ERROR DURING SAVE: ' + err); 
            return 'ERROR_DURING_SAVE';
        });
        
        
    }else{
        return 'CUSTOMER_HAS_IN_PROGRESS';
    }
    //return 'UNKNOWN_ERROR';
    console.log('----------END CREATE PROG------------');
}
global.createProgram = createProgram;

function checkCustomerProgramStatus(custId){
    return new Promise(function (resolve, reject) {
    var currProgQuery = {customer_id: custId, status: "IN_PROGRESS"};
    Program.findOne(currProgQuery).then(currProg => {
        if(currProg !== null){
            resolve(currProg.status);
        }else{
            resolve('NONE');
        }  
    }).catch(err => {
        console.log('checkCustomerProgramStatus --- ERROR = ' + err);
        reject(err);
    });
});
};
global.checkCustomerProgramStatus = checkCustomerProgramStatus;

function getTempProg(progTempId){
    return new Promise(function (resolve, reject) {
    var query = {'_id' : progTempId};
    ProgramTemp.findOne(query).then(progTemp => {
        if (!progTemp) {
            reject("Program template not found with id " + progTempId);
        }
        resolve(progTemp);
    }).catch(err => {
        console.log('getTempProg --- ERROR = ' + err);
        reject(err);
    });
});
};
global.getTempProg = getTempProg;

function getTempSessionId(progTempId){
    return new Promise(function (resolve, reject) {
    ProgramTemp.findById(progTempId).then(progTemp => {
        if (!progTemp) {
            reject("Program template not found with id " + progTempId);
        }
        resolve(progTemp.sessions);

    }).catch(err => {
        console.log('getTempSession IDs --- ERROR = ' + err);
        return err;
    });
});
};
global.getTempSessionId = getTempSessionId;


function getTempSessionData(sessionIds){
    return new Promise(function (resolve, reject) {
    SessionTemplate.findById(sessionIds).then(sTemp => {
        if (!sTemp) {
            reject("Session templates not found with id " + sessionIds);
        }
        console.log('IN getTempSessionData ------ sTemp = ' + sTemp);
        if(Array.isArray(sTemp)){
            console.log('IN getTempSessionData is array');
            var newSessions = [];
        
            for(var idx in sTemp){
                var newSession = new Session({
                    name: sTemp[idx]['name'],
                    session_type: sTemp[idx]['session_type'],
                    session_status: sTemp[idx]['session_status'],
                    session_coach_notes: sTemp[idx]['session_coach_notes'],
                    session_template_duration: sTemp[idx]['session_template_duration'],
                    session_template_tag: sTemp[idx]['session_template_tag'],
                    exercises: sTemp[idx]['exercises'],
                    program_template_id: sTemp[idx]['program_template_id']
                });
                newSessions.push(newSession);
            }
            resolve(newSessions);
            console.log('IN getTempSessionData NOT array');
            console.log('sTemp = ' + sTemp);
            
            resolve(sTemp);
        }else{
            var newSession = new Session({
                    name: sTemp['name'],
                    session_type: sTemp['session_type'],
                    session_status: sTemp['session_status'],
                    session_coach_notes: sTemp['session_coach_notes'],
                    session_template_duration: sTemp['session_template_duration'],
                    session_template_tag: sTemp['session_template_tag'],
                    exercises: sTemp['exercises'],
                    program_template_id: sTemp['program_template_id']
                });

            var newArray = [];
            newArray.push(newSession);
            resolve(newArray);
        }
    }).catch(err => {
        console.log('getTempSessionData --- ERROR = ' + err);
        return err;
    });
});
};
global.getTempSessionData = getTempSessionData;


function getExercises(exerciseId){
    return new Promise(function (resolve, reject) {
        
    Exercise.findById(exerciseId).then(eTemp => {
            console.log('found exercises ' + exerciseId);
            console.log('eTemp ' + eTemp);
            if (!eTemp) {
                reject("exercises not found with id " + exerciseId);
            }
            if(Array.isArray(eTemp)){
                resolve(eTemp);
            }else{
                var newArray = [];
                newArray.push(eTemp);
                resolve(newArray);
            }
        }).catch(err => {
            console.log('insertExerciseIntoSessions --- ERROR = ' + err);
            return err;
        });
});
};
global.getExercises = getExercises;

