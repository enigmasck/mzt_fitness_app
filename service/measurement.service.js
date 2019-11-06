const Measurement = require('../models/measurement.model.js');

// Create and save a new measurement for one customer
exports.create = function (Custmeasurement) {
    return new Promise(function (resolve, reject) {
        // Validate request
        if (!Custmeasurement) {
            resolve("Measurement content can not be empty");
        }
        // Create a measurement
        const measurement = new Measurement({
            customer_id: Custmeasurement['customer_id'],
            measurement_date: Custmeasurement['measurement_date'],
            heartRate1: Custmeasurement['heartRate1'],
            heartRate2: Custmeasurement['heartRate2'],
            heartRate3: Custmeasurement['heartRate3']
        });

        // Save the measurement in the database
        measurement.save()
                .then(data => {
                    resolve(data);
                }).catch(err => {
            reject("Some error occurred while creating the measurement: " + err);
        });
    });
};

// Retrieve a list of measurements by customer ID
exports.findByCustomerId = function (customer_id) {
    return new Promise(function (resolve, reject) {
        var query = {'customer_id': customer_id};
        Measurement.find(query)
        .then(measurements => {
            if (!measurements){
                reject("Measurement not found with customer id" + customer_id);
            }
            resolve(measurements);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Measurement not found with customer id " + customer_id);
            }
            reject('Some error occured while retrieving the measurements with customer id' + customer_id);
        });
    });
};
