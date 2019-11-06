const Customer = require('../models/customer.model.js');
require('../service/checkNull.js');

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        Customer.find()
                .then(customers => {
                    resolve(customers);
                }).catch(err => {
            reject('IT WAS REJECTED');
        });
    });
};

exports.findOne = function (custId) {
    return new Promise(function (resolve, reject) {
        Customer.findById(custId)
                .then(customers => {
                    resolve(customers);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject('Customer Not Found By ID');
            }
            //TODO setup real error messages
            reject('INTERNAL ERROR');
        });
    });
};

// Create and save a new customer
exports.create = function (cust) {
    return new Promise(function (resolve, reject) {
        // Validate request
        if(!cust) {
            reject('Customer content can not be empty');
        }
        var raw = {};
        raw = checkNull(raw, cust);
        // Create a customer
        const customer = new Customer(raw);

        // Save the customer in the database
        customer.save()
        .then(data => {
            resolve(data);
        }).catch(err => {
            reject(err.message || "Some error occurred while creating the customer.");
        });
    });
};

// Update a customer identified by the customerId in the request
exports.update = function(cust) {
  return new Promise(function(resolve, reject) {
        // Validate Request
        if(!cust) {
            reject("Customer content can not be empty");
        }
        var raw = {};
        raw = checkNull(raw, cust);
        // Find customer and update its name with the request body
        Customer.findByIdAndUpdate(cust['customer_id'], raw, {new: true})
        .then(customers => {
            if(!customers) {
                reject("Customer not found with id " + cust['customer_id']);
            }
            resolve(customers);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                reject("Customer not found with id " + cust['customer_id']);
            }
            reject("Error updating customer with id " + cust['customer_id']);
        });
    });
};

// Delete a customer with the specified customerId in the request
exports.delete = function(customer_id) {
  return new Promise(function(resolve, reject) {
    Customer.findByIdAndRemove(customer_id)
    .then(customers => {
        if(!customers) {
            reject("Customer not found with id " + customer_id);
        }
        resolve("Customer deleted successfully!");
    }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                reject("Customer not found with id " + customer_id);            
            }
            reject("Could not delete customer with id " + customer_id);
        });
    });
};
