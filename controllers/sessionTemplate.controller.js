'use strict';

var utils = require('../utils/writer.js');
var SessionTemp = require('../service/sessionTemplate.service.js');

module.exports.getSessionTempById = function getSessionTempById(req, res, next) {
    var sessionTemplateId = req.swagger.params['session_template_id'].value;
    SessionTemp.findOne(sessionTemplateId)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.getAllSessionTemp = function getAllSessionTemp(req, res, next) {
    SessionTemp.findAll()
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.addSessionTemp = function addSessionTemp(req, res, next) {
    SessionTemp.create(req.body)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.updateSessionTemp = function updateSessionTemp(req, res, next) {
    SessionTemp.update(req.body)
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};

module.exports.deleteSessionTemp = function deleteSessionTemp(req, res, next) {
    SessionTemp.delete(req.query['session_template_id'])
            .then(function (response) {
                utils.writeJson(res, response);
            })
            .catch(function (response) {
                utils.writeJson(res, response);
            });
};