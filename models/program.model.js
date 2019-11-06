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
    sessions: Array,
    coach_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Coach'},
    staus: {type: String, enum:['IN_PROGRESS','COMPLETED','CANCELED'], default: 'IN_PROGRESS'}
}, {
    timestamp: true
});

module.exports = mongoose.model('Program', ProgramSchema);
