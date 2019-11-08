'use strict';

var utils = require('../utils/writer.js');
var Program = require('../service/program.service');

module.exports.assignProgramTemplate = function assignProgramTemplate(req, res, next) {
    var coachId = req.body['coach_id'];
    var customerId = req.body['customer_id'];
    var programTempId = req.body['program_template_id'];
    console.log('coach id: ' + coachId);
    console.log('customer id: ' + customerId);
    console.log('program template id: ' + programTempId);
    Program.assignProgramTemplate(coachId, customerId, programTempId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getAllPrograms = function getAllPrograms (req, res, next) {
  console.log('getAllPrograms');
  Program.findAll().then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};

module.exports.getProgramById = function getProgramById (req, res, next) {
  console.log('getProgramById');
  var program_id = req.swagger.params['program_id'].value;
  console.log('getProgramById='+program_id);
  Program.findOne(program_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getProgramByCustomerId = function getProgramByCustomerId (req, res, next) {
  var customerId = req.swagger.params['customer_id'].value;
  Program.findProgramByCustomerId(customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateProgram = function updateProgram (req, res, next) {
  Program.update(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProgram = function deleteProgram (req, res, next) {
  Program.delete(req.query['program_id'])
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateExerciseResult = function updateExerciseResult (req, res, next) {
  var progId = req.body['program_id'];
  var sessionNb = req.body['sessionNumber'];
  var exerciseNb = req.body['exerciseNumber'];
  var exerciseRes = req.body['exerciseResult'];
  
  Program.addExerciseResult(progId, sessionNb, exerciseNb, exerciseRes)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};