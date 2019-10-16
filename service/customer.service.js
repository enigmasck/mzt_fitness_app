const Customer = require('../models/customer.model.js');

exports.findAll = function() {
  return new Promise(function(resolve, reject) {
    Customer.find()
    .then(customers => {
        resolve(customers);
    }).catch(err => {
        reject('IT WAS REJECTED');
    });
  });
};

exports.findOne = function(custId) {
  return new Promise(function(resolve, reject) {
        Customer.findById(custId)
        .then(customers => {
            resolve(customers);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                reject('Customer Not Found By ID');            
            }
            //TODO setup real error messages
            reject('INTERNAL ERROR');
        });
    });
};

// Create and save a new customer
exports.create = function(cust) {
  return new Promise(function(resolve, reject) {
        // Validate request
        if(!cust) {
            reject('Customer content can not be empty');
        }

        // Create a customer
        const customer = new Customer({ 
            first_name: cust.firstName || "NA",
            last_name: cust.lastName || "NA",
            signup_date: cust.signupDate || "NA",
            gender: cust.gender || "NA",
            dob: cust.dob || "NA",
            activity_level: cust.activityLevel || "NA",
            goal: cust.goal || "NA",
            phone: cust.phone || "NA",
            email: cust.email || "NA",
            address: cust.address || "NA",
            health_condition: cust.healthCondition || "NA",
            occupation: cust.occupation || "NA",
            availability: cust.availability || "NA",
            commitment: cust.commitment || "NA"
        });

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

        // Find customer and update its name with the request body
        Customer.findByIdAndUpdate(cust.customerId, {
            first_name: cust.firstName || "NA",
            last_name: cust.lastName || "NA"
        }, {new: true})
        .then(customers => {
            if(!customers) {
                reject("Customer not found with id " + cust.customerId);
            }
            resolve(customers);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                reject("Customer not found with id " + cust.customerId);
            }
            reject("Error updating customer with id " + cust.customerId);
        });
    });
};

// Delete a customer with the specified customerId in the request
exports.delete = function(customerId) {
  return new Promise(function(resolve, reject) {
    Customer.findByIdAndRemove(customerId)
    .then(customers => {
        if(!customers) {
            reject("Customer not found with id " + customerId);
        }
        resolve("Customer deleted successfully!");
    }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                reject("Customer not found with id " + customerId);            
            }
            reject("Could not delete customer with id " + customerId);
        });
    });
};