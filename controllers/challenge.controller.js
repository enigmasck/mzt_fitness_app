'use strict';

var utils = require('../utils/writer.js');
var Challenge = require('../service/challenge.service');

module.exports.getAllChallenges = function getAllChallenges (req, res, next) {
  Challenge.findAll().then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};

module.exports.getChallengeById = function getChallengeById (req, res, next) {
  var challenge_id = req.swagger.params['challenge_id'].value;
  Challenge.findOne(challenge_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addChallenge = function addChallenge (req, res, next) {
  Challenge.create(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateChallenge = function updateChallenge (req, res, next) {
  Challenge.update(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteChallenge = function deleteChallenge (req, res, next) {
  Challenge.delete(req.query['challenge_id'])
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};