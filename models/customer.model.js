const mongoose = require('mongoose')

const CustomerSchema = mongoose.Schema({
	customer_id: String,
        first_name: String,
	last_name: String,
	signup_date: String,
        gender: String,
        dob: String,
        activity_level: String,
        goal: String,
        phone: String,
        email: String,
        address: String,
        health_condition: String,
        occupation: String,
        availability: String,
        commitment: String
}, {
	timestamp: true
});

module.exports = mongoose.model('Customer', CustomerSchema)