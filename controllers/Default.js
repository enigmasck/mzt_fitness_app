'use strict';

var utils = require('../utils/writer.js');
var Customer = require('../service/customer.service');
var Exercise = require('../service/exercise.service');
var Session = require('../service/session.service');


/*module.exports.getAllCustomers = function getAllCustomers (req, res, next) {
  console.log('getAllCustomers');
  Customer.findAll().then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};

module.exports.getAllExercises = function getAllExercises (req, res, next) {
  Exercise.getAllExercises()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCustomerById = function getCustomerById (req, res, next) {
  console.log('getCustomerById');
  var customerId = req.swagger.params['customerId'].value;
  console.log('getCustomerById='+customerId);
  Customer.findOne(customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};*/

/*
module.exports.getCustomerMeasurementsById = function getCustomerMeasurementsById (req, res, next) {
  var customerId = req.swagger.params['customerId'].value;
  Customer.getCustomerMeasurementsById(customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCustomerMeasurementsByIdDate = function getCustomerMeasurementsByIdDate (req, res, next) {
  var customerId = req.swagger.params['customerId'].value;
  var measurementDate = req.swagger.params['measurementDate'].value;
  c.getCustomerMeasurementsByIdDate(customerId,measurementDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
*/

module.exports.getExerciseById = function getExerciseById (req, res, next) {
  var exerciseId = req.swagger.params['exerciseId'].value;
  Exercise.getExerciseById(exerciseId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
