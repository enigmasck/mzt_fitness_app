'use strict';

var utils = require('../utils/writer.js');
const PERFORMANCE = require('../service/performance.indicator.service');

module.exports.getAllPerformanceIndicators = function getPerformanceIndicators (req, res, next) {
    var custId = req.swagger.params['customer_id'].value;
    PERFORMANCE.findAll(custId).then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });

};
