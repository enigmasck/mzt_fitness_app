const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
	session_id: String,
        session_name: String,
        session_type: String,
        session_start_date: Date,
        session_end_date: Date,
        session_coach_notes: String,
        session_customer_feedback: String,
        program_id: String,
        coach_id: String,
        customer_id: String,
        exercise_tag: Array,
        measurement_date: Date        
}, {
	timestamp: true
});

module.exports = mongoose.model('Session', SessionSchema);
