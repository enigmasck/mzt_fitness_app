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
const Customer = require('../models/customer.model.js');

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
            customer_id: custId,
            coach_id: coachId,
            sessions: tempSessData
        });

        var update = await updateCustomerStatus(custId);
        console.log(update);
        
        var saveSuccess = false;
        var programSave = await program.save().then(data => {
            saveSuccess = true;
        }).catch(err => {
           console.log('ERROR DURING SAVE: ' + err); 
            return 'ERROR_DURING_SAVE';
        });
        
        if(saveSuccess === true){return program;}
        
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
    var currProgQuery = {customer_id: custId, $or: [{status: "IN_PROGRESS"}, {status: "ASSIGNED"}]};
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
async function getTempSessionData(sessionIds){
    var sessions = [];
    for(var sid in sessionIds){
        var sessionData = await getOneTempSessionData(sessionIds[sid]);
        sessions.push(sessionData);
    }
    return sessions;
};
global.getTempSessionData = getTempSessionData;

function getOneTempSessionData(sessionId){
    return new Promise(function (resolve, reject) {
    SessionTemplate.findById(sessionId).then(sTemp => {
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
        resolve(newSession);
    }).catch(err => {
        console.log('getOneTempSessionData --- ERROR = ' + err);
        reject(err);
    });
});
};
global.getOneTempSessionData = getOneTempSessionData;

/*
 * @function: getExercises
 * @arugment: String: exerciseId
 * @description: Get an exercise for a given exerciseId
 * @returns {array[Exercise]}
 * @error: Caught error message
 *  - Reject : If Missing/Incorrect exerciseId
 */
async function getExercises(exerciseIds){
        var exercises = [];
        for(var eIdx in exerciseIds){
            var eData = await getOneExercise(exerciseIds[eIdx]);
            exercises.push(eData);
        }
        return exercises;
};
global.getExercises = getExercises;

function getOneExercise(exerciseId){
    return new Promise(function (resolve, reject) {
    Exercise.findById(exerciseId).then(eTemp => {
            if (!eTemp) {
                reject("exercises not found with id " + exerciseId);
            }
             resolve(eTemp);
        }).catch(err => {
            console.log('insertExerciseIntoSessions --- ERROR = ' + err);
            reject(err);
        });
});
};
global.getOneExercise = getOneExercise;

/*
 * @function: updateCustomerStatus
 * @arugments: {string} custId
 * @description: update the status of a customer: NONE->ASSIGNED
 * @returns: {string}: {ASSIGNED}
 * @error: Caught error message
 */
function updateCustomerStatus(custId){
    return new Promise(function (resolve, reject) {
    Customer.findByIdAndUpdate(custId, {status: "ASSIGNED"}, {new: true})
        .then(customers => {
            if(!customers) {
                reject("Customer not found with id " + custId);
            }
            resolve("ASSIGNED");
        }).catch(err => {
            reject(err);
        });
});
};
global.updateCustomerStatus = updateCustomerStatus;

