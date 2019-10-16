const Exercise = require('../models/exercise.model.js');

exports.findAll = function() {
  return new Promise(function(resolve, reject) {
        Exercise.find()
        .then(exercises => {
            resolve(exercises);
        }).catch(err => {
            reject(err.message || "Some error occured while retrieving exercises.");
        });
    });
};

exports.findOne = function(exercise_id) {
  return new Promise(function(resolve, reject) {
        Exercise.findById(exercise_id)
        .then(exercises => {
            if(!exercises) {
                reject("Customer not found with id " + exercise_id);            
            }
            resolve(exercises);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                reject("Exercise not found with id " + exercise_id);                
            }
            reject("Error retrieving exercise with id " + exercise_id);
        });
    });
};

// Create and save a new exercise
exports.create = function(ex) {
  return new Promise(function(resolve, reject) {
        if(!exercise) {
            resolve("Exercise content can not be empty");
        }
        console.log('before new exercise');
        const exercise = new Exercise({
            name: ex.name || "Untitled Exercise", 
            description: ex.description || "NA",
            equipement_required: ex.equipement_required || "NA",
            exercise_type: ex.exercise_type || "NA",
            muscles_targeted: ex.muscles_targeted || "NA",
            set_break: ex.set_break || "NA",
            repetition: ex.repetition || "NA",
            sets: ex.sets || "NA",
            exercise_est_duration: ex.exercise_est_duration || "NA", 
            exercise_tag: ex.exercise_tag || "NA"
        });

        exercise.save()
        .then(data => {
            resolve(data);
            console.log('data saved');
        }).catch(err => {
            reject(err.message || "Some error occurred while creating the exercise");
        });
    });
};

// Update an exercise identified by the exerciseId in the request
exports.update = function(ex) {
  return new Promise(function(resolve, reject) {
        if(!ex) {
            resolve("Exercise content can not be empty");
        }
        // Find exercise and update its name with the request body
        Exercise.findByIdAndUpdate(ex.exercise_id, {
            name: ex.name || "Untitled Exercise" 
        }, {new: true})
        .then(exercises => {
            if(!exercises) {
                reject("Exercise not found with id " + ex.exercise_id);
            }
            resolve(exercises);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                reject("Exercise not found with id " + ex.exercise_id);               
            }
           reject("Error updating exercise with id " + ex.exercise_id);
        });
    });
};

// Delete an exercise with the specified exerciseId in the request
exports.delete = function(exId) {
  return new Promise(function(resolve, reject) {
        Exercise.findByIdAndRemove(exId)
        .then(exercises => {
            if(!exercises) {
                reject("Exercise not found with id " + exId);
            }
            resolve("Exercise deleted successfully!");
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                reject("Exercise not found with id " + exId);               
            }
            reject("Could not delete exercise with id " + exId); 
        });
    });
};
