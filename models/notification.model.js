const mongoose = require('mongoose');

const NotifcationSchema = mongoose.Schema({
	notification_id: String,
        coach_id: String,
        customer_id: String,
        notify_for: String,
        notify_type: String,
        msg: String
}, {
	timestamp: true
});

module.exports = mongoose.model('Notification', NotifcationSchema);