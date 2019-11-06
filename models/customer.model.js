const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    customer_id: String,
    first_name: String,
    last_name: String,
    signup_date: {type: Date, default: Date.now()},
    gender: String,
    dob: Date,
    activity_level: String,
    goal: String,
    phone: String,
    email: {type: String, required: true},
    code: String,
    address: String,
    health_condition: String,
    occupation: String,
    availability: String,
    commitment: String
}, {
    timestamp: true
});

module.exports = mongoose.model('Customer', CustomerSchema);