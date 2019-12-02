const CHALLENGE = require('../models/challenge.model.js');
const ERROR_MSG = require('../message.strings/error.strings.js');
require('../service/checkNull.js');

/*
 * @function: findAll
 * @arguments: null
 * @description: Find all challenges in the database.
 * @returns {JSON} : a JSON object model of type Challenge
 * @error: {reject} : reject with error message
 */
exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        CHALLENGE.find().then(challenges => {
            resolve(challenges);
        }).catch(err => {
            reject(ERROR_MSG.INTERNAL_ERROR);
        });
    });
};

/*
 * @function: find6RandomChallenge
 * @arguments: null
 * @description: Get 6 random challenges for the challenge lottery wheel
 * @returns {JSON} : a JSON object model of type Challenge
 * @error: {reject} : reject with error message
 */
exports.find6RandomChallenge = function () {
    return new Promise(function (resolve, reject) {
        var query = [{$sample: {size: 6}}];
        CHALLENGE.aggregate(query).then(challenges => {
            resolve(challenges);
        }).catch(err => {
            reject(ERROR_MSG.INTERNAL_ERROR);
        });
    });
};

/*
 * @function: findOne
 * @arguments: null
 * @description: Retrieve challenges by CustomerID
 * @returns {JSON} : a JSON object model of type Challenge
 * @error: {reject} : reject with error message
 */
exports.findOne = function (custId) {
    return new Promise(function (resolve, reject) {
        CHALLENGE.findById(custId).then(challenges => {
            resolve(challenges);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject(ERROR_MSG.WARN_NO_DATA_FOUND);
            }

            reject(ERROR_MSG.INTERNAL_ERROR);
        });
    });
};

/*
 * @function: create
 * @arguments: {JSON} : JSON object of type Challenge
 * @description: Create a new challenge
 * @returns {JSON} : a JSON object model of type Challenge
 * @error: {reject} : reject with error message
 */
exports.create = function (nChallenge) {
    return new Promise(function (resolve, reject) {

        if(!nChallenge) {
            reject(ERROR_MSG.WARN_UPDATE_CONTENT_EMPTY);
        }
        var raw = {};
        raw = checkNull(raw, nChallenge);

        const NEW_CHALLENGE = new CHALLENGE(raw);

        NEW_CHALLENGE.save().then(data => {
            resolve(data);
        }).catch(err => {
            reject(ERROR_MSG.SAVE_ERROR);
        });
    });
};

/*
 * @function: update
 * @arguments: {JSON} : JSON object with challenge fields
 * @description: Update a new challenge
 * @returns {JSON} : a JSON object model of type Challenge
 * @error: {reject} : reject with error message
 */
exports.update = function(nChallenge) {
  return new Promise(function(resolve, reject) {
        // Validate Request
        if(!nChallenge) {
            reject(ERROR_MSG.WARN_NO_DATA_FOUND);
        }
        var raw = {};
        raw = checkNull(raw, nChallenge);
        // Find challenge and update its name with the request body
        CHALLENGE.findByIdAndUpdate(nChallenge['challenge_id'], raw, {new: true})
        .then(challenges => {
            if(!challenges) {
                reject(ERROR_MSG.WARN_NO_DATA_FOUND);
            }
            resolve(challenges);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                reject(ERROR_MSG.WARN_NO_DATA_FOUND);
            }
            reject(ERROR_MSG.INTERNAL_ERROR);
        });
    });
};

/*
 * @function: delete
 * @arguments: {string} : challenge_id
 * @description: Delete a challenge
 * @returns {string} : delete successful message
 * @error: {reject} : reject with error message
 */
exports.delete = function(challenge_id) {
  return new Promise(function(resolve, reject) {
    CHALLENGE.findByIdAndRemove(challenge_id)
    .then(challenges => {
        if(!challenges) {
            reject(ERROR_MSG.WARN_NO_DATA_FOUND);
        }
        resolve("Challenge deleted successfully!");
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            reject(ERROR_MSG.WARN_NO_DATA_FOUND);            
        }
        reject(ERROR_MSG.WARN_NO_DATA_FOUND);
    });
});
};
