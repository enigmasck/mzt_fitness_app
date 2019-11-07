'use strict';

var utils = require('../utils/writer.js');
var SessionTemp = require('../service/sessionTemplate.service.js');

module.exports.assignExercise = function assignExercise(req, res, next) {
    var sessionTempId = req.body['session_template_id'];
    var exerciseId = req.body['exercise_id'];
    SessionTemp.assignExercise(exerciseId, sessionTempId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getSessionTempById = function getSessionTempById(req, res, next) {
    var sessionTemplateId = req.swagger.params['session_template_id'].value;
    SessionTemp.findOne(sessionTemplateId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getAllSessionTemps = function getAllSessionTemps(req, res, next) {
    console.log("getAllSessionTemps");
    SessionTemp.findAll()
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.addSessionTemp = function addSessionTemp(req, res, next) {
    SessionTemp.create(req.body)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.updateSessionTemp = function updateSessionTemp(req, res, next) {
    SessionTemp.update(req.body)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.deleteSessionTemp = function deleteSessionTemp(req, res, next) {
    SessionTemp.delete(req.query['session_template_id'])
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};