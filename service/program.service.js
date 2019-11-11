const Program = require('../models/program.model.js');
const ProgramTemp = require('../models/programTemplate.model.js');
const SessionTemplate = require('../models/sessionTemplate.model.js');
const Exercise = require('../models/exercise.model.js');
require('../service/checkNull.js');
require('../helpers/program.helpers.js');

exports.assignProgramTemplate = function (coachId, custId, progTempId) {
    return new Promise(function (resolve, reject) {
        try{
            var createProgRes = createProgram(progTempId, custId, coachId);
            //console.log('createProgRes='+createProgRes);
            resolve({});
        }catch(err){
            reject(err);
        }

});
};
exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        Program.find()
                .then(programs => {
                    resolve(programs);
                }).catch(err => {
            reject('IT WAS REJECTED');
        });
    });
};

exports.findOne = function (progId) {
    return new Promise(function (resolve, reject) {
        Program.findById(progId)
                .then(programs => {
                    resolve(programs);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject('Program Not Found By ID');
            }
            //TODO setup real error messages
            reject('INTERNAL ERROR');
        });
    });
};

exports.findProgramByCustomerId = function (custId) {
    return new Promise(function (resolve, reject) {
        var query = {customer_id: custId};
        Program.find(query)
                .then(programs => {
                    resolve(programs);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject('Program Not Found By Customer ID');
            }
            //TODO setup real error messages
            reject('INTERNAL ERROR');
        });
    });
};

// Update a program identified by the programId in the request
exports.update = function (prog) {
    return new Promise(function (resolve, reject) {
        // Validate Request
        if (!prog) {
            reject("Program content can not be empty");
        }
        var raw = {};
        raw = checkNull(raw, prog);
        // Find program and update its name with the request body
        Program.findByIdAndUpdate(prog['program_id'], raw, {new : true})
                .then(programs => {
                    if (!programs) {
                        reject("Program not found with id " + prog['program_id']);
                    }
                    resolve(programs);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Program not found with id " + prog['program_id']);
            }
            reject("Error updating program with id " + prog['program_id']);
        });
    });
};

// Delete a program with the specified programId in the request
exports.delete = function (program_id) {
    return new Promise(function (resolve, reject) {
        Program.findByIdAndRemove(program_id)
                .then(programs => {
                    if (!programs) {
                        reject("Program not found with id " + program_id);
                    }
                    resolve("Program deleted successfully!");
                }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                reject("Program not found with id " + program_id);
            }
            reject("Could not delete program with id " + program_id);
        });
    });
};

// Update a program to add the results of each exercise
exports.addExerciseResult = function (progId, sessionNb, exerciseNb, exerciseRes) {
    return new Promise(function (resolve, reject) {
        // Get the program
        Program.findById(progId).then(prog => {
            if (!prog) {
                reject("Program template not found with id " + progId);
            } else {
                Program.findByIdAndUpdate(progId,
                        {"$set": {["sessions." + sessionNb + ".exercises." + exerciseNb + ".result"]: exerciseRes}}
                , {new : true})
                        .then(prog => {
                            if (!prog) {
                                reject("Program not found with id " + progId);
                            }
                            resolve(prog);
                        }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        reject("Program not found with id " + progId);
                    }
                    reject("Error updating program with id " + progId);
                });
            }
        });
    });
};

// Update a session status in a program when a session is opened or completed
exports.updateSessStat = function (progId, sessionNb) {
    return new Promise(function (resolve, reject) {
        // Get the program
        Program.findById(progId).then(prog => {
            if (!prog) {
                reject("Program template not found with id " + progId);
            } else {
                if (prog.sessions[sessionNb].session_status === 'CLOSED') {
                    Program.findByIdAndUpdate(progId,
                            {"$set": {["sessions." + sessionNb + ".session_status"]: "OPENED"}}
                    , {new : true})
                            .then(prog => {
                                if (!prog) {
                                    reject("Program not found with id " + progId);
                                }
                                resolve(prog);
                            }).catch(err => {
                        if (err.kind === 'ObjectId') {
                            reject("Program not found with id " + progId);
                        }
                        reject("Error updating program with id " + progId);
                    });
                }
                else{
                    if(prog.sessions[sessionNb].session_status === 'OPENED'){
                        Program.findByIdAndUpdate(progId,
                                {"$set": {["sessions." + sessionNb + ".session_status"]: "COMPLETED"}}
                        , {new : true})
                                .then(prog => {
                                    if (!prog) {
                                        reject("Program not found with id " + progId);
                                    }
                                    resolve(prog);
                                }).catch(err => {
                            if (err.kind === 'ObjectId') {
                                reject("Program not found with id " + progId);
                            }
                            reject("Error updating program with id " + progId);
                        });
                    }
                }
            }
        });
    });
};
