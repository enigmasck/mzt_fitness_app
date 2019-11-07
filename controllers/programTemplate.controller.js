'use strict';

var utils = require('../utils/writer.js');
var ProgramTemp = require('../service/programTemplate.service');

module.exports.showInformation= function showInformation(req, res, next) {
    var programTempId = req.swagger.params['program_template_id'].value;
    ProgramTemp.showInformation(programTempId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.assignSessionTemplate = function assignSessionTemplate(req, res, next) {
    var sessionTempId = req.body['session_template_id'];
    var programTempId = req.body['program_template_id'];
    console.log("sessionTempId:"+sessionTempId);
    console.log("programTempId:"+programTempId);
    ProgramTemp.assignSessionTemplate(sessionTempId, programTempId)
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