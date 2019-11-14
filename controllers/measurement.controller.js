'use strict';

var utils = require('../utils/writer.js');
var Measurement = require('../service/measurement.service');
const NOTIFICATION_SERVICE = require('../service/notification.service');

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

// Retrieve all the measurements for a customer (by its ID)and by program Id
module.exports.getCustomerMeasurementsById = function getCustomerMeasurementsById (req, res, next) {
    var custId = req.query['customer_id'];
    var progId = req.query['program_id'];
    Measurement.findByCustomerIdAndProgramId(custId, progId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Retrieve one measurement for a customer (by its ID), by program ID and by measurement date
module.exports.getCustomerMeasurementsByIdAndDate = function getCustomerMeasurementsByIdAndDate (req, res, next) {
    var custId = req.body['customer_id'];
    var measurementDate = req.body['measurement_date'];
    var progId = req.body['program_id'];
    
    Measurement.findByCustomerIdAndMeasurementDateAndProgramId(custId, measurementDate, progId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

// Update the measurements for customers with a goal to lose weight OR to add coach feedback
module.exports.updateMeasurement = function updateMeasurement(req, res, next) {
    Measurement.updateMeasurement(req.body)
    .then(function (response) {
        utils.writeJson(res, response);
    })
    .catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.updateFocusFeedback = function updateFocusFeedback(req, res, next) {
    var customerId = req.body['customer_id'];
    var coachId = req.body['coach_id'];
    Measurement.updateFocusFeedback(req.body)
    .then(function (response) {
        //add notifcation that focus session feedback is available
        var newNotificationJson = {"customer_id":customerId, 
                "coach_id":coachId,
                "notify_for":"CUSTOMER",
                "notify_type":"FOCUS_SESSION_FEEDBACK",
                "msg":"You have new focus session feedback waiting for you!"};
        NOTIFICATION_SERVICE.addNotification(newNotificationJson);
        utils.writeJson(res, response);
    })
    .catch(function (response) {
        utils.writeJson(res, response);
    });
};
