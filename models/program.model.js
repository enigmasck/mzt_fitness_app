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
    sessions: [{type: mongoose.Schema.Types.Object}],
    coach_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Coach'},
    status: {type: String, enum:['ASSIGNED','IN_PROGRESS','COMPLETED','CANCELED'], default: 'ASSIGNED'},
    create_timestamp: {type: Date, default: Date.now()}
}, {
    timestamp: true
});

module.exports = mongoose.model('Program', ProgramSchema);
