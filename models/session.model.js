const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    session_name: String,
    session_type: String,
    session_duration: Number,
    session_start_date: Date,
    session_end_date: Date,
    session_coach_notes: String,
    session_customer_feedback: String,
    exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}],
    session_tag: Array,
    measurement_date: Date
}, {
    timestamp: true
});

module.exports = mongoose.model('Session', SessionSchema);
