'use strict';

var utils = require('../utils/writer.js');
var offerTrans = require('../service/offer.transaction.service');


module.exports.getAllTransByCustomerId = function getAllTransByCustomerId (req, res, next) {
    var custId = req.swagger.params['customer_id'].value;
    offerTrans.findOne(custId).then(function (response) {
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