'use strict';

var utils = require('../utils/writer.js');
var Exercise = require('../service/exercise.service');

module.exports.getExerciseById = function getExerciseById(req, res, next) {
    var exerciseId = req.swagger.params['exercise_id'].value;
    Exercise.findOne(exerciseId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getAllExercises = function getAllExercises(req, res, next) {
    Exercise.findAll()
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.addExercise = function addExercise(req, res, next) {
    Exercise.create(req.body)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.updateExercise = function updateExercise(req, res, next) {
    Exercise.update(req.body)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.deleteExercise = function deleteExercise(req, res, next) {
    Exercise.delete(req.query['exercise_id'])
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};