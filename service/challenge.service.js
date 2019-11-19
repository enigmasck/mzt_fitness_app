const Challenge = require('../models/challenge.model.js');
require('../service/checkNull.js');

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        Challenge.find()
                .then(challenges => {
                    resolve(challenges);
                }).catch(err => {
            reject('IT WAS REJECTED');
        });
    });
};

exports.findOne = function (custId) {
    return new Promise(function (resolve, reject) {
        Challenge.findById(custId)
                .then(challenges => {
                    resolve(challenges);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject('Challenge Not Found By ID');
            }
            //TODO setup real error messages
            reject('INTERNAL ERROR');
        });
    });
};

// Create and save a new challenge
exports.create = function (cust) {
    return new Promise(function (resolve, reject) {
        // Validate request
        if(!cust) {
            reject('Challenge content can not be empty');
        }
        var raw = {};
        raw = checkNull(raw, cust);
        // Create a challenge
        const challenge = new Challenge(raw);

        // Save the challenge in the database
        challenge.save()
        .then(data => {
            resolve(data);
        }).catch(err => {
            reject(err.message || "Some error occurred while creating the challenge.");
        });
    });
};

// Update a challenge identified by the challengeId in the request
exports.update = function(cust) {
  return new Promise(function(resolve, reject) {
        // Validate Request
        if(!cust) {
            reject("Challenge content can not be empty");
        }
        var raw = {};
        raw = checkNull(raw, cust);
        // Find challenge and update its name with the request body
        Challenge.findByIdAndUpdate(cust['challenge_id'], raw, {new: true})
        .then(challenges => {
            if(!challenges) {
                reject("Challenge not found with id " + cust['challenge_id']);
            }
            resolve(challenges);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                reject("Challenge not found with id " + cust['challenge_id']);
            }
            reject("Error updating challenge with id " + cust['challenge_id']);
        });
    });
};

// Delete a challenge with the specified challengeId in the request
exports.delete = function(challenge_id) {
  return new Promise(function(resolve, reject) {
    Challenge.findByIdAndRemove(challenge_id)
    .then(challenges => {
        if(!challenges) {
            reject("Challenge not found with id " + challenge_id);
        }
        resolve("Challenge deleted successfully!");
    }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                reject("Challenge not found with id " + challenge_id);            
            }
            reject("Could not delete challenge with id " + challenge_id);
        });
    });
};
