const mongoose = require('mongoose'), Schema = mongoose.Schema;
const Customer = require('../models/customer.model.js');

const MeasurementSchema = mongoose.Schema({
    measurement_id: String,
    customer_id: {type: String, required: true},
    measurement_date: {type: Date, default: Date.now()},
    heartRate1: {type: Number, required: true},
    heartRate2: {type: Number, required: true},
    heartRate3: {type: Number, required: true},
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