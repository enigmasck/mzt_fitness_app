const mongoose = require('mongoose'), Schema = mongoose.Schema;
const Customer = require('../models/customer.model.js');

const MeasurementSchema = mongoose.Schema({
    measurement_id: String,
    customer_id: String,
    measurement_date: {type: Date, default: Date.now()},
    heartRate1: Number, 
    heartRate2: Number, 
    heartRate3: Number, 
    weight: Number,
    height: Number,
    chest: Number,
    arms: Number,
    hips: Number,
    thigh: Number,
    waist: Number,
    dickson_metric: Number
}, {
	timestamp: true
});

module.exports = mongoose.model('Measurement', MeasurementSchema);