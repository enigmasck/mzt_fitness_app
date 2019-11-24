const NOTIFICATION = require('../models/notification.model.js');
const PROGRAM = require('../models/program.model.js');
const NOTIFY = require('../message.strings/notification.strings.js');
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
        var query = {customer_id : custId, coach_id: coachId, notify_for: notifFor, notify_type: notifType};
        NOTIFICATION.find(query).then(notif => {
            resolve(notif);
        }).catch(err => {
            reject('ERROR : ' + err);
        });
    });
};

exports.findFocusApproach = function (coachId) {
    return new Promise(function (resolve, reject) {
        var query = {coach_id: coachId, status: 'IN_PROGRESS'};
        var fsNotFound = true;
        PROGRAM.find(query).then(notif => {
            for(var k in notif){
                for(var i in notif[k].sessions){
                    i = Number(i);
                    if(i <  notif[k].sessions.length-1){
                        //find a session that has the next session that is focused and the current session is open, completed, or in_progress
                        if((notif[k].sessions[i].session_status === 'OPENED' || notif[k].sessions[i].session_status === 'IN_PROGRESS' 
                            || notif[k].sessions[i].session_status === 'COMPLETED') && notif[k].sessions[i].session_type === 'regular'
                            &&  notif[k].sessions[i+1].session_type === 'focus' &&  notif[k].sessions[i+1].session_status === 'CLOSED'
                            && fsNotFound){
                            var newNotificationJson = {
                                "coach_id":coachId,
                                "notify_for":NOTIFY.NOTIF_FOR_COACH,
                                "notify_type":NOTIFY.NOTIF_TYPE_FOCUS_SESSION_APPROACH,
                                "msg":NOTIFY.NOTIF_MSG_FOCUS_SESSION_APPROACH};
                            resolve(newNotificationJson);
                            fsNotFound = false;
                        }
                    }
                }
            }
            if(fsNotFound){resolve({});}
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
