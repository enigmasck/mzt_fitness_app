'use strict';

var utils = require('../utils/writer.js');
var offerTrans = require('../service/offer.transaction.service');

module.exports.getAllTransByCustomerId = function getAllTransByCustomerId (req, res, next) {
    var custId = req.swagger.params['customer_id'].value;
    offerTrans.findByCustId(custId).then(function (response) {
        utils.writeJson(res, response);
    })
    .catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.findByCustAndTransType = function findByCustAndTransType (req, res, next) {
    var custId = req.swagger.params['customer_id'].value;
    var transType = req.swagger.params['transaction_type'].value;
    offerTrans.findByCustAndTransType(custId,transType).then(function (response) {
        utils.writeJson(res, response);
    })
    .catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.challengeCustomer = function challengeCustomer (req, res, next) {
    var custId = req.body['customer_id'];
    var challengeId = req.body['challenge_id'];
    offerTrans.challengeCustomer(custId,challengeId).then(function (response) {
        utils.writeJson(res, response);
    })
    .catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.validateChallenge = function validateChallenge (req, res, next) {
    var offerTrandsId = req.body['offer_transaction_id'];
    var offerTransType = req.body['transaction_type'];
    offerTrans.validateChallenge(offerTrandsId,offerTransType).then(function (response) {
        utils.writeJson(res, response);
    })
    .catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.redeemPoints = function redeemPoints (req, res, next) {
    var custId = req.body['customer_id'];
    var offerId = req.body['offer_id'];
    offerTrans.redeemPoints(custId, offerId).then(function (response) {
        utils.writeJson(res, response);
    })
    .catch(function (response) {
        utils.writeJson(res, response);
    });
};

module.exports.getTotalPoints = function getTotalPoints (req, res, next) {
    var custId = req.swagger.params['customer_id'].value;
    offerTrans.getTotalPoints(custId).then(function (response) {
        utils.writeJson(res, response);
    })
    .catch(function (response) {
        utils.writeJson(res, response);
    });
};