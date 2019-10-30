'use strict';

var utils = require('../utils/writer.js');
var SessionTemp = require('../service/session.template.service');

module.exports.getSessionTempById = function getSessionTempById (req, res, next) {
  var sessionId = req.swagger.params['session_template_id'].value;
  SessionTemp.findOne(sessionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllSessionTempByProgId = function getAllSessionTempByProgId (req, res, next) {
  var programId = req.swagger.params['program_template_id'].value;
  SessionTemp.findAllByProgId(programId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addSessionTemp = function addSessionTemp (req, res, next) {
  SessionTemp.create(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSessionTemp = function updateSessionTemp (req, res, next) {
  SessionTemp.update(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteSessionTemp = function deleteSessionTemp (req, res, next) {
  SessionTemp.delete(req.query['session_id'])
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};