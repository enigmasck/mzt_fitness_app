const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ProgramTemplateSchema = mongoose.Schema({
    program_template_id: String,
    title: String,
    type: String,
    description: String,
    duration: Number,
    sessions: [{type: mongoose.Schema.Types.ObjectId, ref: 'SessionTemplate'}]
}, {
    timestamp: true
});

module.exports = mongoose.model('ProgramTemplate', ProgramTemplateSchema);