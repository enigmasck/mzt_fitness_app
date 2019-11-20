const Offer = require('../models/offer.model.js');
require('../service/checkNull.js');

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        Offer.find()
                .then(offers => {
                    resolve(offers);
                }).catch(err => {
            reject('IT WAS REJECTED');
        });
    });
};

exports.findOne = function (offerId) {
    return new Promise(function (resolve, reject) {
        Offer.findById(offerId)
                .then(offers => {
                    resolve(offers);
                }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject('Offer Not Found By ID');
            }
            //TODO setup real error messages
            reject('INTERNAL ERROR');
        });
    });
};
