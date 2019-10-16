const mongoose = require('mongoose');

const CoachSchema = mongoose.Schema({
	coach_id: String,
        first_name: String,
        last_name: String,
        email: String,
        phone: String,
        address: String,
        address2: String,
        city: String,
        country: String,   
        motto: String,
        coachcol: String
}, {
	timestamp: true
});

module.exports = mongoose.model('Coach', CoachSchema);