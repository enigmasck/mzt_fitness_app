const mongoose = require('mongoose');

const ProgramSchema = mongoose.Schema({
    program_id: String,
    title: String,
    description: String,
    programSDate: Date,
    programEDate: Date,
    coach_id: String
}, {
    timestamp: true
});

module.exports = mongoose.model('Program', ProgramSchema);
