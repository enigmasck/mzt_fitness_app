const Customer = require('../models/customer.model.js');

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

        // Create a customer
        const customer = new Customer({ 
            first_name: cust['first_name'] || "NA",
            last_name: cust['last_name'] || "NA",
            signup_date: cust['signup_date'] || 0000-00-00,
            gender: cust['gender'] || "NA",
            dob: cust['dob'] || "NA",
            activity_level: cust['activity_level'] || "NA",
            goal: cust['goal'] || "NA",
            phone: cust['phone'] || "NA",
            email: cust['email'] || "NA",
            address: cust['address'] || "NA",
            health_condition: cust['health_condition'] || "NA",
            occupation: cust['occupation'] || "NA",
            availability: cust['availability'] || "NA",
            commitment: cust['commitment'] || "NA"
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
        Customer.findByIdAndUpdate(cust['customer_id'], {
            first_name: cust['first_name'] || "NA",
            last_name: cust['last_name'] || "NA"
        }, {new: true})
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
