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
  console.log(customerId);
  Measurement.findByCustomerId(customerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
