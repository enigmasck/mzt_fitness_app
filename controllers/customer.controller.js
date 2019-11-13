'use strict';

var utils = require('../utils/writer.js');
var Customer = require('../service/customer.service');

module.exports.getAllCustomers = function getAllCustomers (req, res, next) {
  Customer.findAll().then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};

module.exports.getCustomerById = function getCustomerById (req, res, next) {
  var customer_id = req.swagger.params['customer_id'].value;
  Customer.findOne(customer_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addCustomer = function addCustomer (req, res, next) {
  Customer.create(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.updateCustomer = function updateCustomer (req, res, next) {
  Customer.update(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCustomer = function deleteCustomer (req, res, next) {
  Customer.delete(req.query['customer_id'])
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};