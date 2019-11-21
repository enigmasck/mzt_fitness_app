const OFFER_TRANS = require('../models/offer.transaction.model.js');
const ERROR_MSG = require('../message.strings/error.strings.js');
require('../service/checkNull.js');

exports.findOne = function (custId) {
    return new Promise(function (resolve, reject) {
        OFFER_TRANS.findById(custId).then(offerTrans => {
            resolve(offerTrans);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject(ERROR_MSG.WARN_NO_ID);
            }
            //TODO setup real error messages
            reject(ERROR_MSG.INTERNAL_ERROR);
        });
    });
};

exports.getTotalPoints = function (custId) {
    return new Promise(function (resolve, reject) {
        var query = [
            {
                $match: {"customer_id": custId}
            },
            {
                $group: {
                    _id: "transaction_type",
                    totalPoints: {$sum: "$points"}
                }
            }
        ];
        
        var qTest = [
            { $group: { _id: null, maxBalance: { $max: '$points' }}},
            { $project: { _id: 0, maxBalance: 1 }}
        ];
        OFFER_TRANS.aggregate(query).then(totPts => {
            console.log("customer id = " + custId);
            console.log("total points = " + totPts);
            for(var i in totPts){
                console.log("i = " + i)
                console.log("max points = " + totPts[i]['_id']);
            }
            var totEarned = totPts._id['EARNED'].totalPoints;
            var totRedeem = totPts._id['REDEEMED'].totalPoints;
            resolve(totEarned - totRedeem);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject(ERROR_MSG.WARN_NO_ID);
            }
            //TODO setup real error messages
            reject(ERROR_MSG.INTERNAL_ERROR);
        });
    });
};