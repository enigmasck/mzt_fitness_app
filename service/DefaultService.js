'use strict';
const Customer = require('../models/customer.model.js') 

/**
 * Gets list of all customers
 *
 * returns List
 **/
exports.getAllCustomers = function() {
  return new Promise(function(resolve, reject) {
  var data = {};
  console.log('in getAllCustomers');
  data = Customer.find();
  console.log('data='+data); 
    /*if (Object.keys(data).length > 0) {
      resolve(data[Object.keys(data)[0]]);
    } else {
      resolve();
    }*/
  });
}


/**
 * Gets all customer information by customer ID
 *
 * customerId Long The customer id
 * returns List
 **/
exports.getCustomerById = function(customerId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "lastName" : "lastName",
  "signupDate" : "2000-01-23",
  "goal" : "goal",
  "address" : {
    "zip" : 64246,
    "address2" : "address2",
    "city" : "city",
    "address1" : "address1"
  },
  "occupation" : "occupation",
  "gender" : "gender",
  "commitment" : "commitment",
  "availability" : "availability",
  "health_condition" : "health_condition",
  "firstName" : "firstName",
  "phone" : "phone",
  "dob" : "2000-01-23",
  "customerId" : 0,
  "activityLevel" : "activityLevel",
  "email" : ""
}, {
  "lastName" : "lastName",
  "signupDate" : "2000-01-23",
  "goal" : "goal",
  "address" : {
    "zip" : 64246,
    "address2" : "address2",
    "city" : "city",
    "address1" : "address1"
  },
  "occupation" : "occupation",
  "gender" : "gender",
  "commitment" : "commitment",
  "availability" : "availability",
  "health_condition" : "health_condition",
  "firstName" : "firstName",
  "phone" : "phone",
  "dob" : "2000-01-23",
  "customerId" : 0,
  "activityLevel" : "activityLevel",
  "email" : ""
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets list of a customer's measurements by their id. This returns multiple measurements if there exists more than 1
 *
 * customerId Long The customer id
 * returns List
 **/
exports.getCustomerMeasurementsById = function(customerId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "bodyRightLeg" : 7.061401241503109,
  "bodyRightLegThigh" : 2.027123023002322,
  "bodyLeftArm" : 5.962133916683182,
  "bodyHip" : 3.616076749251911,
  "weight" : 6.027456183070403,
  "measurementDate" : "2000-01-23",
  "bodyLeftLeg" : 2.3021358869347655,
  "dicksonMetric" : 7.386281948385884,
  "bodyRightArm" : 5.637376656633329,
  "customerId" : 0,
  "bodyNeck" : 9.301444243932576,
  "bodyLeftLegThigh" : 4.145608029883936,
  "height" : 1.4658129805029452
}, {
  "bodyRightLeg" : 7.061401241503109,
  "bodyRightLegThigh" : 2.027123023002322,
  "bodyLeftArm" : 5.962133916683182,
  "bodyHip" : 3.616076749251911,
  "weight" : 6.027456183070403,
  "measurementDate" : "2000-01-23",
  "bodyLeftLeg" : 2.3021358869347655,
  "dicksonMetric" : 7.386281948385884,
  "bodyRightArm" : 5.637376656633329,
  "customerId" : 0,
  "bodyNeck" : 9.301444243932576,
  "bodyLeftLegThigh" : 4.145608029883936,
  "height" : 1.4658129805029452
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets list of a customer's measurements by their id and measurement date
 *
 * customerId Long The customer id
 * measurementDate date The customer measurementDate
 * returns List
 **/
exports.getCustomerMeasurementsByIdDate = function(customerId,measurementDate) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "bodyRightLeg" : 7.061401241503109,
  "bodyRightLegThigh" : 2.027123023002322,
  "bodyLeftArm" : 5.962133916683182,
  "bodyHip" : 3.616076749251911,
  "weight" : 6.027456183070403,
  "measurementDate" : "2000-01-23",
  "bodyLeftLeg" : 2.3021358869347655,
  "dicksonMetric" : 7.386281948385884,
  "bodyRightArm" : 5.637376656633329,
  "customerId" : 0,
  "bodyNeck" : 9.301444243932576,
  "bodyLeftLegThigh" : 4.145608029883936,
  "height" : 1.4658129805029452
}, {
  "bodyRightLeg" : 7.061401241503109,
  "bodyRightLegThigh" : 2.027123023002322,
  "bodyLeftArm" : 5.962133916683182,
  "bodyHip" : 3.616076749251911,
  "weight" : 6.027456183070403,
  "measurementDate" : "2000-01-23",
  "bodyLeftLeg" : 2.3021358869347655,
  "dicksonMetric" : 7.386281948385884,
  "bodyRightArm" : 5.637376656633329,
  "customerId" : 0,
  "bodyNeck" : 9.301444243932576,
  "bodyLeftLegThigh" : 4.145608029883936,
  "height" : 1.4658129805029452
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

