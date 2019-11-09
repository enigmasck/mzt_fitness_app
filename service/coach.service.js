const Coach = require('../models/coach.model.js');
require('../service/checkNull.js');

exports.findAll = function () {
    return new Promise(function (resolve, reject) {
        Coach.find()
                .then(coaches => {
                    resolve(coaches);
                }).catch(err => {
            reject('IT WAS REJECTED');
        });
    });
};