const mongoose = require('mongoose');

const CustomerMeasurementSchema = mongoose.Schema({
	customer_id: String,
	measurement_date: String,
	weight: Number,
        height: Number,
        body_left_arm: Number,
        body_right_arm: Number,
        body_left_leg: Number,
        body_right_leg: Number,
        body_neck: Number,
        body_hip: Number,
        body_right_leg_thigh: Number,
        body_left_leg_thigh: Number,
        dickson_metric: Number
}, {
	timestamp: true
});

module.exports = mongoose.model('CustomerMeasurement', CustomerMeasurementSchema);