'use strict';

var utils = require('../utils/writer.js');
var Exercise = require('../service/exercise.service');

module.exports.getExerciseById = function getExerciseById (req, res, next) {
  var exerciseId = req.swagger.params['exercise_id'].value;
  Exercise.findOne(exerciseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllExercises = function getAllExercises (req, res, next) {
  Exercise.findAll()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addExercise = function addExercise (req, res, next) {
  console.log('req.swagger.params[].value='+req.swagger.params['body']);
  console.log('req.swagger.params='+req.swagger.params['addExercise']);
  console.log('req.swagger.params='+req.swagger.params);
  console.log('req.requestBody='+req.requestBody);
  console.log('req.swagger.requestBody='+req.swagger.requestBody);
  console.log('req.swagger.params.requestBody='+req.swagger.params.requestBody);
  console.log('req.swagger.params.body='+req.swagger.params.body);
  console.log('req.swagger.params.addExercise='+req.swagger.params.addExercise);
  console.log('req.swagger.params keys'+Object.keys(req.swagger.params));
  for(var i in req.swagger){
      console.log(i);
  }
  console.log('params end');      
  for(var i in req.swagger.params){
      console.log(i);
  }
  Exercise.create(req.swagger.params)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateExercise = function updateExercise (req, res, next) {
  Exercise.create(req.swagger.params)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};