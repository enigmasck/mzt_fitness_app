const mongoose = require('mongoose');

const SessionTemplateSchema = mongoose.Schema({
	session_template_id: String,
        name: String,
        session_type: String,
        session_coach_notes: String,
        session_duration: Number,
        exercise_tag: Array
}, {
	timestamp: true
},
);

module.exports = mongoose.model('SessionTemplate', SessionTemplateSchema);