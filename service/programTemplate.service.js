const ProgramTemp = require('../models/programTemplate.model.js');
require('../service/checkNull.js');

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        ProgramTemp.find()
                .then(programTemplates => {
                    resolve(programTemplates);
                }).catch(err => {
            reject('IT WAS REJECTED');
        });
    });
};

exports.findOne = function (progTempId) {
    return new Promise(function (resolve, reject) {
        ProgramTemp.findById(progTempId)
                .then(programTemplate => {
                    resolve(programTemplate);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject('Program Template Not Found By ID');
            }
            //TODO setup real error messages
            reject('INTERNAL ERROR');
        });
    });
};

// Create and save a new program Template
exports.create = function (progTemp) {
    return new Promise(function (resolve, reject) {
        // Validate request
        if (!progTemp) {
            reject('Program Template content can not be empty');
        }

        // Create a program Template
        const programTemplate = new ProgramTemp({
            title: progTemp['title'] || "No title",
            description: progTemp['description'] || "No description",
            programDuration: progTemp['programDuration'] || "60 days"
        });

        // Save the program template in the database
        programTemplate.save()
                .then(data => {
                    resolve(data);
                }).catch(err => {
            reject(err.message || "Some error occurred while creating the program template.");
        });
    });
};

// Update a program template identified by the programTempId in the request
exports.update = function (progTemp) {
    return new Promise(function (resolve, reject) {
        // Validate Request
        if (!progTemp) {
            reject("Program template content can not be empty");
        }
        var raw = {};
        raw = checkNull(raw, progTemp);
        // Find program template and update its name with the request body
        ProgramTemp.findByIdAndUpdate(progTemp['program_template_id'], raw, {new : true})
                .then(programTemplates => {
                    if (!programTemplates) {
                        reject("Program template not found with id " + progTemp['program_template_id']);
                    }
                    resolve(programTemplates);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Program template not found with id " + progTemp['program_template_id']);
            }
            reject("Error updating program template with id " + progTemp['program_template_id']);
        });
    });
};

// Delete a program template with the specified programTempId in the request
exports.delete = function (program_template_id) {
    return new Promise(function (resolve, reject) {
        ProgramTemp.findByIdAndRemove(program_template_id)
                .then(programTemplates => {
                    if (!programTemplates) {
                        reject("Program template not found with id " + program_template_id);
                    }
                    resolve("Program template deleted successfully!");
                }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                reject("Program template not found with id " + program_template_id);
            }
            reject("Could not delete program template with id " + program_template_id);
        });
    });
};