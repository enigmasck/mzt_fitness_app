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