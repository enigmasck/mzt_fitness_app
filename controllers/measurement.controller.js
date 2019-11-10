'use strict';

var utils = require('../utils/writer.js');
var Measurement = require('../service/measurement.service');

// Create a new measurement for a customer
module.exports.addMeasurement = function addMeasurement (req, res, next) {
    Measurement.create(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Retrieve all the measurements for a customer (by its ID)
module.exports.getCustomerMeasurementsById = function getCustomerMeasurementsById (req, res, next) {
    var customerId = req.swagger.params['customer_id'].value;
    Measurement.findByCustomerId(customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Retrieve all the measurements for a customer (by its ID)
module.exports.getCustomerMeasurementsByIdAndDate = function getCustomerMeasurementsByIdAndDate (req, res, next) {
    var custId = req.body['customer_id'];
    var measurementDate = req.body['measurement_date'];
    
    Measurement.findByCustomerIdAndMeasurementDate(custId, measurementDate)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Update the measurements for customers with a goal to lose weight
module.exports.updateMeasurement = function updateMeasurement(req, res, next) {
    Measurement.update(req.body)
    .then(function (response) {
        utils.writeJson(res, response);
    })
    .catch(function (response) {
        utils.writeJson(res, response);
    });
};