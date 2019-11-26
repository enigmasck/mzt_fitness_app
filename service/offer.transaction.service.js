const OFFER_TRANS = require('../models/offer.transaction.model.js');
const CHALLENGE = require('../models/challenge.model.js');
const OFFER = require('../models/offer.model.js');
const ERROR_MSG = require('../message.strings/error.strings.js');
require('../service/checkNull.js');
var mongoose = require('mongoose');

exports.findByCustId = function (custId) {
    return new Promise(function (resolve, reject) {
        var query = {customer_id:custId};
        OFFER_TRANS.find(query).populate(
                {path: 'challenge_id'}).then(offerTrans => {
            resolve(offerTrans);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject(ERROR_MSG.WARN_NO_ID);
            }
            reject(ERROR_MSG.INTERNAL_ERROR);
        });
    });
};

exports.findByCustAndTransType = function (custId,transType) {
    return new Promise(function (resolve, reject) {
        var query = {
            customer_id: custId,
            transaction_type : {$in: transType}
        };
        OFFER_TRANS.find(query).populate(
                {path: 'challenge_id'}).then(offerTrans => {
            resolve(offerTrans);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject(ERROR_MSG.WARN_NO_ID);
            }
            reject(ERROR_MSG.INTERNAL_ERROR);
        }); 
    });
};

exports.challengeCustomer = function (custId, challengeId) {
    return new Promise(function (resolve, reject) {
        var queryInProg = {customer_id:custId,transaction_type:"IN_PROGRESS"};
        OFFER_TRANS.find(queryInProg).then(offerTrans => {
            
            if(offerTrans.length < 1){
                CHALLENGE.findById(challengeId).then(challenge => {
                //console.log('challenge = ' + challenge);
                offerTransRec = new OFFER_TRANS({
                    customer_id : custId,
                    challenge_id : challengeId,
                    transaction_type : 'IN_PROGRESS',
                    points : challenge.points
                });
                offerTransRec.save().then(offerTrans => {
                    resolve(offerTransRec);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        reject(ERROR_MSG.WARN_NO_ID);
                    }
                    reject(ERROR_MSG.INTERNAL_ERROR);
                });
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        reject(ERROR_MSG.WARN_NO_ID);
                    }
                    reject(ERROR_MSG.INTERNAL_ERROR);
                });
            }else{
                resolve(ERROR_MSG.WARN_ONLY_ONE_CHALLENGE);
            }
        });

    });
};

exports.validateChallenge = function (offerTransId, transType) {
    return new Promise(function (resolve, reject) {
        OFFER_TRANS.findByIdAndUpdate(offerTransId, {"$set": {transaction_type: transType}}, {new : true}).then(offerTrans => {
            resolve(offerTrans);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject(ERROR_MSG.WARN_NO_ID);
            }
            reject(ERROR_MSG.INTERNAL_ERROR);
        });
    });
};

exports.redeemPoints = function (custId, offerId) {
    return new Promise(function (resolve, reject) {
        
        OFFER.findById(offerId).then(offer => {
            offerTransRec = new OFFER_TRANS({
                customer_id : custId,
                offer_id : offerId,
                transaction_type : 'REDEEMED',
                points : offer.points
            });
        
            offerTransRec.save().then(offerTrans => {
                resolve(offerTransRec);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    reject(ERROR_MSG.WARN_NO_ID);
                }
                reject(ERROR_MSG.INTERNAL_ERROR);
            });
        });
    });
};

exports.getTotalPoints = function (custId) {
    return new Promise(function (resolve, reject) {
        var query = [
            {
                $match: {"customer_id": mongoose.Types.ObjectId(custId), transaction_type: {$in: ["EARNED","REDEEMED"]}}
            },
            {
                $group: {
                    _id: "$transaction_type",
                    totalPoints: {$sum: "$points"}
                }
            },
            {
                $sort: {transaction_type: -1}
            }
        ];
        OFFER_TRANS.aggregate(query).then(totPts => {
            var totEarned = 0;
            var totRedeem = 0;

            for(var i in totPts){
                try{
                    if(totPts[i]['_id'] === 'EARNED'){
                        totEarned = totPts[i]['totalPoints']
                    }
                }catch(err){
                    totEarned = 0;
                }
                try{
                    if(totPts[i]['_id'] === 'REDEEMED'){
                        totRedeem = totPts[i]['totalPoints']
                    }
                }catch(err){
                    totRedeem = 0;
                }
            }
            
            var totalPoints = {
                totalPoints: Number(totEarned - totRedeem),
                totalEarned: totEarned,
                totalRedeemed: totRedeem
            };
            resolve(totalPoints);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject(ERROR_MSG.WARN_NO_ID);
            }
            reject(ERROR_MSG.INTERNAL_ERROR);
        });
    });
};
