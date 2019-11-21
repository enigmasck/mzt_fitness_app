const OFFER = require('../models/offer.model.js');
const ERROR_MSG = require('../message.strings/error.strings.js');
require('../service/checkNull.js');

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        OFFER.find().then(offers => {
            resolve(offers);
        }).catch(err => {
            reject(ERROR_MSG.WARN_NO_DATA_FOUND);
        });
    });
};

exports.findOne = function (offerId) {
    return new Promise(function (resolve, reject) {
        OFFER.findById(offerId).then(offers => {
            resolve(offers);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject(ERROR_MSG.WARN_NO_ID);
            }
            //TODO setup real error messages
            reject(ERROR_MSG.INTERNAL_ERROR);
        });
    });
};
