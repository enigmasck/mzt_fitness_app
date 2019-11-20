const mongoose = require('mongoose');

const NotifcationSchema = mongoose.Schema({
	notification_id: String,
        coach_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Coach'},
        customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
        notify_for: String,
        notify_type: String,
        msg: String
}, {
	timestamp: true
});

module.exports = mongoose.model('Notification', NotifcationSchema);