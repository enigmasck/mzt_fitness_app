const NOTIFICATION = require('../models/notification.model.js');
require('../service/checkNull.js');

exports.addNotification = function (newNotif) {
    return new Promise(function (resolve, reject) {
        const NEW_NOTIFICATION = new NOTIFICATION(newNotif);
        NEW_NOTIFICATION.save().then(notif => {
            resolve(newNotif);
        }).catch(err => {
            reject('ERROR : ' + err);
        });
    });
};

exports.deleteNotification = function (custId, coachId, notifFor, notifType) {
    return new Promise(function (resolve, reject) {
        var query = {customer_id : custId, coach_id: coachId, notify_for: notifFor, notify_type: notifType};
        NOTIFICATION.deleteOne(query)
                .then(notif => {
                    resolve("DELETE_SUCCESS");
                }).catch(err => {
            reject('ERROR : ' + err);
        });
    });
};

exports.find = function (custId, coachId, notifFor, notifType) {
    return new Promise(function (resolve, reject) {
        console.log("customer_id = " + custId);
        console.log("coach = " + coachId);
        console.log("for = " + notifFor);
        console.log("type = " + notifType);
        var query = {customer_id : custId, coach_id: coachId, notify_for: notifFor, notify_type: notifType};
        NOTIFICATION.find(query)
                .then(notif => {
                    resolve(notif);
                }).catch(err => {
            reject('ERROR : ' + err);
        });
    });
};

exports.findAll = function (custId, coachId, notifFor) {
    return new Promise(function (resolve, reject) {
        console.log("customer_id = " + custId);
        console.log("coach = " + coachId);
        console.log("for = " + notifFor);
        var query = {customer_id : custId, coach_id: coachId, notify_for: notifFor};
        NOTIFICATION.find(query)
                .then(notif => {
                    resolve(notif);
                }).catch(err => {
            reject('ERROR : ' + err);
        });
    });
};
