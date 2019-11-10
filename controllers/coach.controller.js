'use strict';

var utils = require('../utils/writer.js');
var Coach = require('../service/coach.service');

module.exports.getAllCoaches = function getAllCoaches (req, res, next) {
  console.log('getAllCoaches');
  Coach.findAll().then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};