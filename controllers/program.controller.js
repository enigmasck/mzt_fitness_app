'use strict';

var utils = require('../utils/writer.js');
var Program = require('../service/program.service');

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

module.exports.addProgram = function addProgram (req, res, next) {
  Program.create(req.body)
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