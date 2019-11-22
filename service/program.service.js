const Program = require('../models/program.model.js');
const ProgramTemp = require('../models/programTemplate.model.js');
const SessionTemplate = require('../models/sessionTemplate.model.js');
const Exercise = require('../models/exercise.model.js');
const Customer = require('../models/customer.model.js');
const NOTIFICATION_SERVICE = require('../service/notification.service');
require('../service/checkNull.js');
require('../helpers/program.helpers.js');
const NOTIFY = require('../message.strings/notification.strings.js')

/*
 * @function: assignProgramTemplate
 * @description: Will assign a program template to a customer, making it one of their
 *  programs in the database.
 */
exports.assignProgramTemplate = function (coachId, custId, progTempId) {
    return new Promise(function (resolve, reject) {
        try {
            var createProgRes = createProgram(progTempId, custId, coachId);
            //console.log('createProgRes='+createProgRes);
            resolve(createProgRes);
        } catch (err) {
            reject(err);
        }

    });
};

/*
 * @function: findAll
 * @description: Get all programs
 */
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

/*
 * @function: findOne
 * @description: Find a program for a given program ID
 */
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

/*
 * @function: findProgramByCustomerId
 * @description: Find a program for a given customer ID
 */
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


/*
 * @function: update
 * @description: Update a program identified by the programId in the request
 */
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

/*
 * @function: delete
 * @description: Delete a program with the specified programId in the request
 */
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

/*
 * @function: addExerciseResult
 * @argument {string} progId, {int} sessionNb, {int} exerciseNb, {JSON} exerciseRes
 * @description: Adds an exercise result for a given program, session, and exercise
 */
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

function updateCustomerStatus(custId, status) {
    return new Promise(function (resolve, reject) {
        Customer.findByIdAndUpdate(custId, {"$set": {status: status}}, {new : true})
                .then(cust => {
                    if (!cust) {
                        reject("Customer not found with id " + custId);
                    }
                    resolve(cust);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Customer not found with id " + custId);
            }
            reject("Error updating customer with id " + custId);
        });
    });
}
;

function updateProgramStatus(progId, status) {
    return new Promise(function (resolve, reject) {
        Program.findByIdAndUpdate(progId,
                {"$set": {status: status}}, {new : true})
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
    });
}
;

function updateSessionStatus(progId, sessionNb, status) {
    return new Promise(function (resolve, reject) {
        Program.findByIdAndUpdate(progId,
                {"$set": {["sessions." + sessionNb + ".session_status"]: status}}
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
    });
}
;
/*
 * @function: updateSessStat
 * @argument {string} progId, {int} sessionNb
 * @description: Update a session status in a program when a session is opened or completed
 */
exports.customerUpdateProgramStat = function (progId) {
    return new Promise(function (resolve, reject) {
        // Get the program
        Program.findById(progId).then(program => {
            if (!program) {
                reject("Program template not found with id " + progId);
            } else {
                if (program.status === 'ASSIGNED') {
                    var prog = updateProgramStatus(progId, "IN_PROGRESS");
                    var cust = updateCustomerStatus(program.customer_id, "IN_PROGRESS");
                    resolve(prog);
                } else {
                    if (program.status === 'IN_PROGRESS') {
                        var prog = updateProgramStatus(progId, "COMPLETED");
                        var cust = updateCustomerStatus(program.customer_id, "NONE");
                        resolve(prog);
                    }
                }
            }
        });
    });
};

exports.coachUpdateProgramStat = function (progId) {
    return new Promise(function (resolve, reject) {
        // Get the program
        Program.findById(progId).then(program => {
            if (!program) {
                reject("Program template not found with id " + progId);
            } else {
                if (program.status === 'ASSIGNED') {
                    var prog = updateProgramStatus(progId, "CANCELED");
                    var cust = updateCustomerStatus(program.customer_id, "NONE");
                    resolve(prog);
                } else {
                    if (program.status === 'IN_PROGRESS') {
                        var prog = updateProgramStatus(progId, "CANCELED");
                        var cust = updateCustomerStatus(program.customer_id, "NONE");
                        resolve(prog);
                    }
                }
            }
        });
    });
};

exports.customerUpdateSessStat = function (progId, sessionNb) {
    return new Promise(function (resolve, reject) {
        // Get the program
        Program.findById(progId).then(program => {
            if (!program) {
                reject("Program template not found with id " + progId);
            } else {
                if (program.sessions[sessionNb].session_status === 'OPENED') {
                    var prog = updateSessionStatus(progId, sessionNb, 'COMPLETED');
                    if (program.sessions[sessionNb].session_type === 'focus') {
                        var newNotificationJson = {"customer_id": prog.customer_id,
                            "coach_id": prog.coach_id,
                            "notify_for": NOTIFY.NOTIF_FOR_COACH,
                            "notify_type": NOTIFY.NOTIF_TYPE_FOCUS_SESSION_COMPLETED,
                            "msg": NOTIFY.NOTIF_MSG_FOCUS_SESSION_COMPLETED};
                        NOTIFICATION_SERVICE.addNotification(newNotificationJson);
                    }
                }
                if(program.sessions.length-1 > sessionNb){
                    if (program.sessions[sessionNb + 1].session_status === 'CLOSED') {
                        if (program.sessions[sessionNb + 1].session_type === 'regular') {
                            var prog = updateSessionStatus(progId, sessionNb + 1, 'OPENED');
                        }
                    }
                }
                resolve(prog);
            }
        });
    });
};

exports.coachUpdateSessStat = function (progId, sessionNb) {
    return new Promise(function (resolve, reject) {
        // Get the program
        Program.findById(progId).then(prog => {
            if (!prog) {
                reject("Program template not found with id " + progId);
            } else {
                if (prog.sessions[sessionNb].session_status === 'OPENED') {
                    var program = updateSessionStatus(progId, sessionNb, 'CLOSED');
                } else {
                    if (prog.sessions[sessionNb].session_status === 'CLOSED') {
                        var program = updateSessionStatus(progId, sessionNb, 'OPENED');
                        //activate notification that a focus session has been opened
                        if (prog.sessions[sessionNb].session_type === 'focus') {
                            var newNotificationJson = {"customer_id": prog.customer_id,
                                "coach_id": prog.coach_id,
                                "notify_for": "CUSTOMER",
                                "notify_type": "FOCUS_SESSION_OPENED",
                                "msg": "Your coach has opened a new focus session for you."};
                            NOTIFICATION_SERVICE.addNotification(newNotificationJson);
                        }
                    }
                }
                resolve(program);
            }
        });
    });
};
