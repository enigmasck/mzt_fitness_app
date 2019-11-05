const mongoose = require('mongoose'), Schema = mongoose.Schema;
const Customer = require('../models/customer.model.js');

const CustomerMeasurementSchema = mongoose.Schema({
	customer_id: { type: Schema.Types.ObjectId, ref: 'Customer' },
	measurement_date: String,
	weight: Number,
        height: Number,
        heartRate1: Number,
        heartRate2: Number,
        heartRate3: Number,
        chest: Number,
        arms: Number,
        hips: Number,
        thigh: Number,
        waist: Number,
        dickson_metric: Number
}, {
	timestamp: true
});

module.exports = mongoose.model('CustomerMeasurement', CustomerMeasurementSchema);