'use strict';

var utils = require('../utils/writer.js');
var Session = require('../service/session.service');
var Exercise = require('../models/exercise.model.js');

module.exports.assignedSessionByExercise = function assignedSessionByExercise(req, res, next) {
    console.log(req.body);
    var sessionId = req.body['session_id'];
    var exerciseId = req.body['exercise_id'];
    console.log('session id = ' + sessionId);
    console.log('exercise id = ' + exerciseId);
    
    Session.assignedSession(sessionId, exerciseId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
}

module.exports.getSessionById = function getSessionById(req, res, next) {
    var sessionId = req.swagger.params['session_id'].value;
    console.log('session id = ' + sessionId);
    Session.findOne(sessionId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getAllSessionsByProgId = function getAllSessionsByProgId(req, res, next) {
    var programId = req.swagger.params['program_id'].value;
    console.log('progId=' + programId);
    Session.findAllByProgId(programId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.addSession = function addSession(req, res, next) {
    Session.create(req.body)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.updateSession = function updateSession(req, res, next) {
    Session.update(req.body)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.deleteSession = function deleteSession(req, res, next) {
    console.log("session id = " + req.swagger.params['session_id'].value);
    Session.delete(req.swagger.params['session_id'].value)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};