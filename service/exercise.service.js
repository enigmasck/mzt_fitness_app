const Exercise = require('../models/exercise.model.js');

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        Exercise.find()
                .then(exercises => {
                    resolve(exercises);
                }).catch(err => {
            reject('IT WAS REJECTED');
        });
    });
};

exports.findOne = function (exerId) {
    return new Promise(function (resolve, reject) {
        Exercise.findById(exerId)
                .then(exercises => {
                    resolve(exercises);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject('Exercise Not Found By ID');
            }
            //TODO setup real error messages
            reject('INTERNAL ERROR');
        });
    });
};

// Create and save a new exercise
exports.create = function () {
    return new Promise(function (resolve, reject) {
        // Validate request
        if (!req.body.content) {
            reject('Exercise content can not be empty');
        }
        // Validate request
        //if(!req.body.content) {
        //    return res.status(400).send({
        //        message: "Exercise content can not be empty"
        //    });
        //}

        // Create an exercise
        const exercise = new Exercise({
            name: req.body.name || "Untitled Exercise",
            description: req.body.description || "NA",
            equipement_required: req.body.equipement_required || "NA",
            exercise_type: req.body.exercise_type || "NA",
            muscles_targeted: req.body.muscles_targeted || "NA",
            set_break: req.body.set_break || "NA",
            repetition: req.body.repetition || "NA",
            sets: req.body.sets || "NA",
            exercise_est_duration: req.body.exercise_est_duration || "NA",
            exercise_tag: req.body.exercise_tag || "NA"
        });

        // Save the exercise in the database
        exercise.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the exercise."
            });
        });
    });
};

// Update an exercise identified by the exerciseId in the request
exports.update = (req, res) => {
    // Validate Request
    //if(!req.body.content) {
    //    return res.status(400).send({
    //        message: "Exercise content can not be empty"
    //    });
    //}

    // Find exercise and update its name with the request body
    Exercise.findByIdAndUpdate(req.params.exerciseId, {
        name: req.body.name || "Untitled Exercise"
    }, {new : true})
            .then(exercises => {
                if (!exercises) {
                    return res.status(404).send({
                        message: "Exercise not found with id " + req.params.exerciseId
                    });
                }
                res.send(exercises);
            }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Exercise not found with id " + req.params.exerciseId
            });
        }
        return res.status(500).send({
            message: "Error updating exercise with id " + req.params.exerciseId
        });
    });
};

// Delete an exercise with the specified exerciseId in the request
exports.delete = (req, res) => {
    Exercise.findByIdAndRemove(req.params.exerciseId)
            .then(exercises => {
                if (!exercises) {
                    return res.status(404).send({
                        message: "Exercise not found with id " + req.params.exerciseId
                    });
                }
                res.send({message: "Exercise deleted successfully!"});
            }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Exercise not found with id " + req.params.exerciseId
            });
        }
        return res.status(500).send({
            message: "Could not delete exercise with id " + req.params.exerciseId
        });
    });
};