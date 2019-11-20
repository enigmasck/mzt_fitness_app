'use strict';

var utils = require('../utils/writer.js');
var Offer = require('../service/offer.service');

module.exports.getAllOffers = function getAllOffers (req, res, next) {
  Offer.findAll().then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};

module.exports.getOfferById = function getOfferById (req, res, next) {
  var offer_id = req.swagger.params['offer_id'].value;
  Offer.findOne(offer_id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
