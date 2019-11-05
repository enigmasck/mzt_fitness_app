const SessionTemp = require('../models/sessionTemplate.model.js');
require('../service/checkNull.js');

exports.findAll = (req, res) => {
    SessionTemp.find()
            .then(sessions => {
                res.send(sessions);
            }).catch(err => {
        reject("Some error occured while retrieving session templates.");
    });
};

exports.findOne = function (sessTempId) {
    return new Promise(function (resolve, reject) {
        SessionTemp.findById(sessTempId)
                .then(sessionTemps => {
                    if (!sessionTemps) {
                        reject("Session template not found with id " + sessTempId);
                    }
                    resolve(sessionTemps);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Session template not found with id " + sessTempId);
            }
            reject("Error retrieving session template with id " + sessTempId);
        });
    });
};

// Create and save a new session template
exports.create = function (sessTemp) {
    return new Promise(function (resolve, reject) {
        // Validate request
        if (!sessTemp) {
            resolve("Session template content can not be empty");
        }

        // Create a session
        const sessionTemp = new SessionTemp({
            name: sessTemp['name'] || "Untitled SessionTemp",
            session_type: sessTemp['session_type'] || "NA",
            session_start_date: sessTemp['session_start_date'] || "2000/01/10",
            session_end_date: sessTemp['session_end_date'] || "2000/01/10",
            session_coach_notes: sessTemp['session_coach_notes'] || "NA",
            session_customer_feedback: sessTemp['session_customer_feedback'] || "NA",
            program_id: sessTemp['program_id'] || "NA",
            coach_id: sessTemp['coach_id'] || "NA",
            customer_id: sessTemp['customer_id'] || "NA",
            exercise_tag: sessTemp['exercise_tag'] || "NA",
            measurement_date: sessTemp['measurement_date'] || "2000/01/10"
        });

        // Save the session in the database
        sessionTemp.save()
                .then(data => {
                    resolve(data);
                }).catch(err => {
            reject("Some error occurred while creating the session template: " + err);
        });
    });
};

// Update a session identified by the session_template_id in the request
exports.update = function (sessTemp) {
    return new Promise(function (resolve, reject) {
        // Validate Request
        if (!sessTemp) {
            return reject("Session template content can not be empty");
        }
        var raw = {};
        // Find the null value and delete
        raw = checkNull(raw, sessTemp);
        // Find session and update it with the request body
        SessionTemp.findByIdAndUpdate(sessTemp['session_template_id'], raw, {new : true})
                .then(sessionTemplates => {
                    if (!sessionTemplates) {
                        reject("Session template not found with id " + sessTemp['session_template_id']);
                    }
                    resolve(sessionTemplates);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Session template not found with id " + sessTemp['session_template_id']);
            }
            reject("Error updating session with id " + sessTemp['session_template_id']);
        });
    });
};

// Delete a session template with the specified session_template_id in the request
exports.delete = function (sessTempId) {
    return new Promise(function (resolve, reject) {

        SessionTemp.findByIdAndRemove(sessTempId)
                .then(sessionTemplates => {
                    if (!sessionTemplates) {
                        reject("Session template not found with id " + sessTempId);
                    }
                    resolve("Session template deleted successfully!");
                }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                reject("Session template not found with id " + sessTempId);
            }
            reject("Could not delete session template with id " + sessTempId);
        });
    });
};