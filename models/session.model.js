const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    name: String,
    session_type: String,
    session_status: String,
    session_duration: Number,
    session_coach_notes: String,
    session_customer_feedback: String,
    exercises: [{type: mongoose.Schema.Types.Object}],
    session_tag: Array,
    measurement_date: String,
    program_template_id: {type: mongoose.Schema.Types.ObjectId}
}, {
    timestamp: true
});

module.exports = mongoose.model('Session', SessionSchema);
