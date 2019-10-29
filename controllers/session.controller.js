'use strict';

var utils = require('../utils/writer.js');
var Session = require('../service/session.service');

module.exports.getSessionById = function getSessionById (req, res, next) {
  var sessionId = req.swagger.params['session_id'].value;
  Session.findOne(sessionId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllSessionByProgId = function getAllSessionByProgId (req, res, next) {
  var programId = req.swagger.params['program_id'].value;
  Session.findAllByProgId(programId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addSession = function addSession (req, res, next) {
  Session.create(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateSession = function updateSession (req, res, next) {
  Session.update(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteSession = function deleteSession (req, res, next) {
  Session.delete(req.query['session_id'])
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};