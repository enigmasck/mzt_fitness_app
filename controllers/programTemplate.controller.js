'use strict';

var utils = require('../utils/writer.js');
var ProgramTemp = require('../service/programTemplate.service');

module.exports.assignProgram = function assignProgram(req, res, next) {
    var coachId = req.body['coach_id'];
    var customerId = req.body['customer_id'];
    var programTempId = req.body['program_template_id'];
    console.log('coach id: ' + coachId);
    console.log('customer id: ' + customerId);
    console.log('program template id: ' + programTempId);
    ProgramTemp.assignProgram(coachId, customerId, programTempId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getAllProgramTemps = function getAllProgramTemps (req, res, next) {
  console.log('getAllProgramTemps');
  ProgramTemp.findAll().then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};

module.exports.getProgramTempById = function getProgramTempById (req, res, next) {
  console.log('getProgramTempById');
  var programTemplateId = req.swagger.params['program_template_id'].value;
  console.log('getProgramTempById='+programTemplateId);
  ProgramTemp.findOne(programTemplateId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addProgramTemp = function addProgramTemp (req, res, next) {
  ProgramTemp.create(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateProgramTemp = function updateProgramTemp (req, res, next) {
  ProgramTemp.update(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteProgramTemp = function deleteProgramTemp (req, res, next) {
  ProgramTemp.delete(req.query['program_template_id'])
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};