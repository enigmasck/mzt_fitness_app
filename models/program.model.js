const mongoose = require('mongoose'), Schema = mongoose.Schema;
const Customer = require('../models/customer.model.js');
const Session = require('../models/session.model.js');

const ProgramSchema = mongoose.Schema({
    program_id: String,
    title: String,
    type: String,
    description: String,
    duration: Number,
    customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    sessions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
    coach_id: String
}, {
    timestamp: true
});

module.exports = mongoose.model('Program', ProgramSchema);
