const Program = require('../models/program.model.js');

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
exports.create = function () {
    return new Promise(function (resolve, reject) {
        // Validate request
        if (!req.body.content) {
            reject('Program content can not be empty');
        }

        // Create a program
        const program = new Program({
            programID: req.body.programid || "NA",
            title: req.body.title || "NA",
            description: req.body.description || "NA",
            programSDate: req.body.programsdate || "NA",
            programEDate: req.body.programedate || "NA",
            coachID: req.body.coachid || "NA"
        });

        // Save the program in the database
        program.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the program."
            });
        });
    });
};

// Update a program identified by the programId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Program content can not be empty"
        });
    }

    // Find program and update its name with the request body
    Program.findByIdAndUpdate(req.params.programId, {
        title: req.body.title || "NA",
        discription: req.body.discription || "NA"
    }, {new : true})
            .then(programs => {
                if (!programs) {
                    return res.status(404).send({
                        message: "Program not found with id " + req.params.programId
                    });
                }
                res.send(programs);
            }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Program not found with id " + req.params.programId
            });
        }
        return res.status(500).send({
            message: "Error updating program with id " + req.params.programId
        });
    });
};

// Delete a program with the specified programId in the request
exports.delete = (req, res) => {
    Program.findByIdAndRemove(req.params.programId)
            .then(programs => {
                if (!programs) {
                    return res.status(404).send({
                        message: "Program not found with id " + req.params.programId
                    });
                }
                res.send({message: "Program deleted successfully!"});
            }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Program not found with id " + req.params.programId
            });
        }
        return res.status(500).send({
            message: "Could not delete program with id " + req.params.programId
        });
    });
};