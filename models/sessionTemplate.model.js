const mongoose = require('mongoose')

const SessionTemplateSchema = mongoose.Schema({
	session_template_id: String,
        coach_id: String,
        session_type: String,
        session_coach_notes: String,
        program_template_id: String
}, {
	timestamp: true
});

module.exports = mongoose.model('SessionTemplate', SessionTemplateSchema)