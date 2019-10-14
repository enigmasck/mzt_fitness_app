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
exports.create = function() {
  return new Promise(function(resolve, reject) {
        // Validate request
        if(!req.body.content) {
            reject('Customer content can not be empty');
        }

        // Create a customer
        const customer = new Customer({ 
            first_name: req.body.first_name || "NA",
            last_name: req.body.last_name || "NA",
            signup_date: req.body.signup_date || "NA",
            gender: req.body.gender || "NA",
            dob: req.body.dob || "NA",
            activity_level: req.body.activity_level || "NA",
            goal: req.body.goal || "NA",
            phone: req.body.phone || "NA",
            email: req.body.email || "NA",
            address: req.body.address || "NA",
            health_condition: req.body.health_condition || "NA",
            occupation: req.body.occupation || "NA",
            availability: req.body.availability || "NA",
            commitment: req.body.commitment || "NA"
        });

        // Save the customer in the database
        customer.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the customer."
            });
        });
    });
};

// Update a customer identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Customer content can not be empty"
        });
    }

    // Find customer and update its name with the request body
    Customer.findByIdAndUpdate(req.params.customerId, {
        first_name: req.body.first_name || "NA",
	last_name: req.body.last_name || "NA"
    }, {new: true})
    .then(customers => {
        if(!customers) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send(customers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.customerId
        });
    });
};

// Delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerId)
    .then(customers => {
        if(!customers) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerId
            });                
        }
        return res.status(500).send({
            message: "Could not delete customer with id " + req.params.customerId
        });
    });
};