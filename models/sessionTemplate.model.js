const mongoose = require('mongoose');

const SessionTemplateSchema = mongoose.Schema({
	session_template_id: String,
        name: String,
        session_type: {type: String, enum:['FOCUS','REGULAR'], default: 'REGULAR'},
        session_coach_notes: String,
        session_template_duration: Number,
        session_template_tag: Array,
        exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}],
        session_status: {type: String, enum:['CLOSED','OPENED','COMPLETED'], default: 'CLOSED'},
        program: {type: mongoose.Schema.Types.ObjectId, ref: 'ProgramTemplate'}
}, {
	timestamp: true
},
);

module.exports = mongoose.model('SessionTemplate', SessionTemplateSchema);