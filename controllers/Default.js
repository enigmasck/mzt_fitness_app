'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.getAllCustomers = function getAllCustomers (req, res, next) {
  Default.getAllCustomers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCustomerById = function getCustomerById (req, res, next) {
  var customerId = req.swagger.params['customerId'].value;
  Default.getCustomerById(customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCustomerMeasurementsById = function getCustomerMeasurementsById (req, res, next) {
  var customerId = req.swagger.params['customerId'].value;
  Default.getCustomerMeasurementsById(customerId)
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
  Default.getCustomerMeasurementsByIdDate(customerId,measurementDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
