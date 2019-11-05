const mongoose = require('mongoose');

const ProgramSchema = mongoose.Schema({
    program_id: String,
    customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    sessions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
    description: String,
    programSDate: Date,
    programEDate: Date,
    coach_id: String
}, {
    timestamp: true
});

module.exports = mongoose.model('Program', ProgramSchema);
