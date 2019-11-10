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
            heartRate3: Custmeasurement['heartRate3'],
            dickson_metric: (((Custmeasurement['heartRate2']-70)+2*(Custmeasurement['heartRate3']-Custmeasurement['heartRate1']))/10)
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
                reject("Measurement not found with customer id " + customer_id);
            }
            resolve(measurements);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Measurement not found with customer id " + customer_id);
            }
            reject('Some error occured while retrieving the measurements with customer id ' + customer_id);
        });
    });
};

// Retrieve a list of measurements by customer ID
exports.findByCustomerIdAndMeasurementDate = function (customer_id, measurement_date) {
    return new Promise(function (resolve, reject) {
        var query = {'customer_id': customer_id,'measurement_date': measurement_date};
        Measurement.find(query)
        .then(measurements => {
            if (!measurements){
                reject("Measurement not found with customer id " + customer_id + " and measurement date " + measurement_date);
            }
            resolve(measurements);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Measurement not found with customer id " + customer_id + " and measurement date " + measurement_date);
            }
            reject('Some error occured while retrieving the measurements with customer id ' + customer_id + " and measurement date " + measurement_date);
        });
    });
};


// Update the measurement for customers with a goal to lose weight
exports.update = function (measu){
    return new Promise(function (resolve, reject) {
        var query = {'customer_id': measu['customer_id'],'measurement_date':  measu['measurement_date']};
        Measurement.findOne(query)
        .then(m => {
            if (!m){
                reject("Measurement not found with customer id " + measu['customer_id'] + " and measurement date " + measu['measurement_date']);
            } else {
                var raw = {};
                raw = checkNull(raw, measu); 
                console.log("WHAT IS TO BE UPDATED: " + m);
                console.log("TO ADD: "+ measu );
                Measurement.findByIdAndUpdate(m['_id'], raw, {new : true})
                .then(measurements => {
                    if (!measurements) {
                        reject("Measurement not found with id " + measurements['_id']);
                    }
                    console.log("UPDATE MEASUREMENT ID: " + measurements['_id']);
                    resolve(measurements);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        reject("Measurement not found with id " + m['_id']);
                    }
                    reject("Error updating program with id " + m['_id']);
                });  
            } 
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Measurement not found with customer id " + measu['customer_id'] + " and measurement date " + measu['measurement_date']);
            }
            reject('Some error occured while retrieving the measurements with customer id ' + measu['customer_id'] + " and measurement date " + measu['measurement_date']);
        });   
    });
};