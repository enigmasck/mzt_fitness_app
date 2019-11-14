const Measurement = require('../models/measurement.model.js');

// Create and save a new measurement for one customer
exports.create = function (Custmeasurement) {
    return new Promise(function (resolve, reject) {
        // Validate request
        if (!Custmeasurement) {
            resolve("Measurement content can not be empty");
        }
        // Create a measurement
        const NEW_MEASURMENT = new Measurement({
            customer_id: Custmeasurement['customer_id'],
            program_id: Custmeasurement['program_id'],
            session_id: Custmeasurement['session_id'],
            measurement_date: Custmeasurement['measurement_date'],
            heartRate1: Custmeasurement['heartRate1'],
            heartRate2: Custmeasurement['heartRate2'],
            heartRate3: Custmeasurement['heartRate3'],
            dickson_metric: (((Custmeasurement['heartRate2']-70)+2*(Custmeasurement['heartRate3']-Custmeasurement['heartRate1']))/10)
        });

        // Save the measurement in the database
        NEW_MEASURMENT.save()
                .then(data => {
                    resolve(data);
                }).catch(err => {
            reject("Some error occurred while creating the measurement: " + err);
        });
    });
};

// Retrieve a list of measurements by customer ID and program ID
exports.findByCustomerIdAndProgramId = function (customer_id, program_id) {
    return new Promise(function (resolve, reject) {
        var query = {'customer_id': customer_id,'program_id':program_id};
        Measurement.find(query)
        .then(measurements => {
            if (!measurements){
                reject("Measurement not found with customer id " + customer_id + " and program id " + program_id);
            }
            resolve(measurements);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Measurement not found with customer id " + customer_id + " and program id " + program_id);
            }
            reject('Some error occured while retrieving the measurements with customer id ' + customer_id + " and program id " + program_id);
        });
    });
};

// Retrieve one measurement, by customer ID, date of measurement and program ID
exports.findByCustomerIdAndMeasurementDateAndProgramId = function (customer_id, measurement_date, program_id) {
    return new Promise(function (resolve, reject) {
        var query = {'customer_id': customer_id,'measurement_date': measurement_date,'program_id':program_id};
        Measurement.find(query)
        .then(measurements => {
            if (!measurements){
                reject("Measurement not found with customer id " + customer_id + ", measurement date " + measurement_date + " and program id " + program_id);
            }
            resolve(measurements);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("Measurement not found with customer id " + customer_id + " and measurement date " + measurement_date + " and program id " + program_id);
            }
            reject('Some error occured while retrieving the measurements with customer id ' + customer_id + " and measurement date " + measurement_date + " and program id " + program_id);
        });
    });
};

// Update the measurement for customers with a goal to lose weight OR to get coach feedback
exports.updateMeasurement = function (measu){
    return new Promise(function (resolve, reject) {
        var query = {'customer_id': measu['customer_id'],'session_id':measu['session_id'],'program_id':measu['program_id']};
        Measurement.findOne(query)
        .then(m => {
            if (!m){
                reject("Measurement not found with customer id " + measu['customer_id'] 
                        + ", session_id " + measu['session_id'] + " and program id " + measu['program_id']);
            } else {
                var raw = {};
                raw = checkNull(raw, measu); 
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
                reject("Measurement not found with customer id " + measu['customer_id'] + ", session_id " 
                        + measu['session_id'] + " and program id " + measu['program_id']);
            }
            reject('Some error occured while retrieving the measurements with customer id ' + measu['customer_id'] 
                    + ", session_id " + measu['session_id'] + " and program id " + measu['program_id']);
        });   
    });
};

exports.updateFocusFeedback = function (feedBack){
    return new Promise(function (resolve, reject) {
        var query = {'customer_id': feedBack['customer_id'], 'session_id':feedBack['session_id'], 'program_id':feedBack['program_id']};
        Measurement.findOne(query)
        .then(m => {
            if (!m){
                reject("Measurement not found with customer id " + feedBack['customer_id'] + ", session_id " 
                        + feedBack['session_id'] + " and program id " + feedBack['program_id']);
            } else {
                var raw = {};
                raw = checkNull(raw, feedBack); 
                Measurement.findByIdAndUpdate(m['_id'], raw, {new : true})
                .then(measurements => {
                    if (!measurements) {
                        reject("Measurement not found with id " + measurements['_id']);
                    }
                    console.log("UPDATE FOCUS FEEDBACK MEASUREMENT ID: " + measurements['_id']);
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
                reject("Measurement not found with customer id " + feedBack['customer_id'] + ", session_id " + 
                        feedBack['session_id'] + " and program id " + feedBack['program_id']);
            }
            reject('Some error occured while retrieving the measurements with customer id ' + feedBack['customer_id'] 
                    + ", session_id " + feedBack['session_id'] + " and program id " + feedBack['program_id']);
        });   
    });
};

