const mongoose = require('mongoose');

const SessionTemplateSchema = mongoose.Schema({
	session_template_id: String,
        name: String,
        coach_id: String,
        session_type: String,
        session_coach_notes: String,
        exercise_tag: Array,
        program_template_id: String
}, {
	timestamp: true
},
);

module.exports = mongoose.model('session_template', SessionTemplateSchema);