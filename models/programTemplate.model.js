const mongoose = require('mongoose');

const ProgramTemplateSchema = mongoose.Schema({
    program_template_id: String,
    title: String,
    description: String,
    programDuration: Number
}, {
    timestamp: true
});

module.exports = mongoose.model('ProgramTemplate', ProgramTemplateSchema);