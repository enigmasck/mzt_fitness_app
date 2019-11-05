const Program = require('../models/program.model.js');
require('../service/checkNull.js');

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

// Create and save a new program
exports.create = function (prog) {
    return new Promise(function (resolve, reject) {
        // Validate request
        if (!prog) {
            reject('Program content can not be empty');
        }

        // Create a program
        const program = new Program({
            title: prog['title'] || "No title",
            description: prog['description'] || "No description",
            programSDate: prog['programsdate'] || 0000-00-00,
            programEDate: prog['programedate'] || 0000-00-00,
        });

        // Save the program in the database
        program.save()
                .then(data => {
                    resolve(data);
                }).catch(err => {
            reject(err.message || "Some error occurred while creating the program.");
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
        Program.findByIdAndUpdate(prog['program_id'], {
            title: prog['title'] || "NA",
            discription: prog['discription'] || "NA"
        }, {new : true})
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