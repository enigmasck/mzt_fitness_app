const mongoose = require('mongoose')


const CustomerSchema = mongoose.Schema({
	firstName: String,
	last_name: String,
	signupDate: String,
        gender: String,
        dob: String,
        activityLevel: String,
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