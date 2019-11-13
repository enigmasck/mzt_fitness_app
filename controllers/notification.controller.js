'use strict';

var utils = require('../utils/writer.js');
var Notification = require('../service/notification.service');

module.exports.activate = function activate (req, res, next) {
  Notification.addNotification(req.body).then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};

module.exports.deactivate = function deactivate (req, res, next) {
  var custId = req.query['customer_id'];
  var coachId = req.query['coach_id'];
  var notifFor = req.query['notify_for'];
  var notifType = req.query['notify_type'];
  Notification.deleteNotification(custId, coachId, notifFor, notifType).then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};

module.exports.checkNotification = function checkNotification (req, res, next) {
  var custId = req.query['customer_id'];
  var coachId = req.query['coach_id'];
  var notifFor = req.query['notify_for'];
  var notifType = req.query['notify_type'];
  Notification.find(custId, coachId, notifFor, notifType).then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};