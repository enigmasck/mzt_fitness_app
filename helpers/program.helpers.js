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

/*
 * @function: createProgram
 * @arguments: {string }progTempId, {string} custId, {string} coachId
 * @description: Helps in creating a program from program template and assigning a
 *  customer to this program. Will save new Program Model in database.
 * @returns {program} : a program modal with session and exercise data, not references
 * @error:
 *  - If customer has program in progress: CUSTOMER_HAS_IN_PROGRESS
 *  - Missing/incorrect programTemplateId: "Program template not found with id " + progTempId
 *  - Missing/incorrect sessionTemplateId: "Session templates not found with id " + sessionIds
 *  - Missing/incorrect exerciseID: "exercises not found with id " + exerciseId 
 */
async function createProgram(progTempId, custId, coachId){
    
    var progStatus = await checkCustomerProgramStatus(custId);
    
    if(progStatus === 'NONE'){
        var tempProg = await getTempProg(progTempId);
        
        var tempSessId = await getTempSessionId(progTempId);
        
        var tempSessData = await getTempSessionData(tempSessId);

        for(var sess in tempSessData){
            var exerciseData = await getExercises(tempSessData[sess].exercises);
            tempSessData[sess].exercises = exerciseData;
        }

        const program = new Program({
            title: tempProg.title,
            type: tempProg['type'],
            description: tempProg['description'],
            duration: tempProg['duration'],
            status: 'ASSIGNED',
            customer_id: custId,
            coach_id: coachId,
            sessions: tempSessData
        });

        
        program.save().then(data => {
            return program;
        }).catch(err => {
           console.log('ERROR DURING SAVE: ' + err); 
            return 'ERROR_DURING_SAVE';
        });
        
        
    }else{
        return 'CUSTOMER_HAS_IN_PROGRESS';
    }

}
global.createProgram = createProgram;

/*
 * @function: checkCustomerProgramStatus
 * @arugments: {string} custId
 * @description: Check to see if a customer has a program with status: IN_PROGRESS
 * @returns: {string}: {IN_PROGRESS, NONE}
 * @error: Caught error message
 */
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

/*
 * @function: getTempProg
 * @argument: {string} progTempId
 * @description: Gets a program template
 * @returns: Promise - Model : ProgramTemplate
 * @error: Caught error message
 */
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

/*
 * @function: getTempSessionId
 * @argument: {string} progTempId
 * @description: Gets a session template(s) from a given program template. If taken
 *  from a template it will be reference to a SessionTemplate, it is getting
 *  a list of ObjectIds that reference to a SessionTemplate
 * @returns: {array[SessionTemplate]}
 * @error: Caught error message
 */
function getTempSessionId(progTempId){
    return new Promise(function (resolve, reject) {
    ProgramTemp.findById(progTempId).then(progTemp => {
        if (!progTemp) {
            reject("Program template not found with id " + progTempId);
        }
        resolve(progTemp.sessions);

    }).catch(err => {
        console.log('getTempSession IDs --- ERROR = ' + err);
        reject(err);
    });
});
};
global.getTempSessionId = getTempSessionId;

/*
 * @function: getTempSessionData
 * @argument {string/array[string]} sessionIds
 * @description: Gets a session template(s) from a given program template ID. This will
 *  return the actual list of session data from a SessionTemplate
 * @returns: {array[SessionTemplate]
 * @error: Caught error message
 */
function getTempSessionData(sessionIds){
    return new Promise(function (resolve, reject) {
    SessionTemplate.findById(sessionIds).then(sTemp => {
        if (!sTemp) {
            reject("Session templates not found with id " + sessionIds);
        }
        if(Array.isArray(sTemp)){
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
        reject(err);
    });
});
};
global.getTempSessionData = getTempSessionData;

/*
 * @function: getExercises
 * @arugment: String: exerciseId
 * @description: Get an exercise for a given exerciseId
 * @returns {array[Exercise]}
 * @error: Caught error message
 *  - Reject : If Missing/Incorrect exerciseId
 */
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
            reject(err);
        });
});
};
global.getExercises = getExercises;

