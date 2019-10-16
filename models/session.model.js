const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
	session_id: String,
        sessin_type: String,
        session_start_date: Date,
        session_end_date: Date,
        session_coach_notes: String,
        session_customer_feedback: String,
        program_id: Number,
        coach_id: Number,
        exercise_tag: Array,
        measurement_date: Date,
        customer_id: String
}, {
	timestamp: true
});

module.exports = mongoose.model('Session', SessionSchema);
