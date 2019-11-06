const mongoose = require('mongoose'), Schema = mongoose.Schema;
const Session = require('../models/session.model.js');

const ProgramTemplateSchema = mongoose.Schema({
    program_template_id: String,
    title: String,
    type: String,
    description: String,
    duration: Number,
    sessions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}]
}, {
    timestamp: true
});

module.exports = mongoose.model('ProgramTemplate', ProgramTemplateSchema);