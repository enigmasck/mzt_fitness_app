'use strict';

var utils = require('../utils/writer.js');
var Customer = require('../service/customer.service.js');
var Exercise = require('../service/exercise.service.js');
var Program = require('../service/program.service.js');
var Session = require('../service/session.service.js');


module.exports.getAllCustomers = function getAllCustomers(req, res, next) {
    console.log('getAllCustomers');
    Customer.findAll().then(function (response) {
        utils.writeJson(res, response);
    })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getAllExercises = function getAllExercises(req, res, next) {
    console.log('getAllExercises');
    Exercise.findAll().then(function (response) {
        utils.writeJson(res, response);
    })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getAllPrograms = function getAllPrograms(req, res, next) {
    console.log('getAllPrograms');
    Program.findAll().then(function (response) {
        utils.writeJson(res, response);
    })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getCustomerById = function getCustomerById(req, res, next) {
    console.log('getCustomerById');
    var customerId = req.swagger.params['customerId'].value;
    console.log('getCustomerById=' + customerId);
    Customer.findOne(customerId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

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

module.exports.getExerciseById = function getExerciseById(req, res, next) {
    console.log('getExerciseById');
    var exerciseId = req.swagger.params['exerciseId'].value;
    console.log('getExerciseById=' + exerciseId);
    Exercise.findOne(exerciseId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getProgramById = function getProgramById(req, res, next) {
    console.log('getProgramById');
    var programId = req.swagger.params['programId'].value;
    console.log('getProgramById=' + programId);
    Program.findOne(programId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};
