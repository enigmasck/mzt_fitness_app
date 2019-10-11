'use strict';
const Customer = require('../models/customer.model.js'); 
const Exercise = require('../models/exercise.model.js'); 

/**
 * Gets list of all customers
 *
 * returns List
 **/
exports.getAllCustomers = function() {
  return new Promise(function(resolve, reject) {
    //VERY IMPORTANT DO NOT FORGETTTTTT .then(TABLENAME =>
    //customers needs to be the exact name of the table in MongoDB
    
    /*Customer.find(function(err, cust){
        console.log(cust);
    });*/
    Customer.find().then(customer => {
        resolve(customer);
    });
  });
};


/**
 * Gets list of all exercises
 *
 * returns List
 **/
exports.getAllExercises = function() {
  return new Promise(function(resolve, reject) {
     //For whatever weird reason....Every collection name needs to be pluralized in the DB
    Exercise.find().then(exercise => {
        console.log(Object.keys(exercise).length);
        resolve(exercise);
    });
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
  "zip" : 17207,
  "lastName" : "lastName",
  "signupDate" : "2000-01-23",
  "goal" : "goal",
  "occupation" : "occupation",
  "gender" : "gender",
  "address2" : "address2",
  "city" : "city",
  "address1" : "address1",
  "commitment" : "commitment",
  "availability" : "availability",
  "health_condition" : "health_condition",
  "firstName" : "firstName",
  "phone" : "phone",
  "dob" : "2000-01-23",
  "customerId" : { },
  "activityLevel" : "activityLevel",
  "email" : ""
}, {
  "zip" : 17207,
  "lastName" : "lastName",
  "signupDate" : "2000-01-23",
  "goal" : "goal",
  "occupation" : "occupation",
  "gender" : "gender",
  "address2" : "address2",
  "city" : "city",
  "address1" : "address1",
  "commitment" : "commitment",
  "availability" : "availability",
  "health_condition" : "health_condition",
  "firstName" : "firstName",
  "phone" : "phone",
  "dob" : "2000-01-23",
  "customerId" : { },
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
  "bodyRightLeg" : 2.3021358869347655,
  "bodyRightLegThigh" : 3.616076749251911,
  "bodyLeftArm" : 1.4658129805029452,
  "bodyHip" : 9.301444243932576,
  "weight" : 0.8008281904610115,
  "measurementDate" : "2000-01-23",
  "bodyLeftLeg" : 5.637376656633329,
  "dicksonMetric" : 4.145608029883936,
  "bodyRightArm" : 5.962133916683182,
  "customerId" : { },
  "bodyNeck" : 7.061401241503109,
  "bodyLeftLegThigh" : 2.027123023002322,
  "height" : 6.027456183070403
}, {
  "bodyRightLeg" : 2.3021358869347655,
  "bodyRightLegThigh" : 3.616076749251911,
  "bodyLeftArm" : 1.4658129805029452,
  "bodyHip" : 9.301444243932576,
  "weight" : 0.8008281904610115,
  "measurementDate" : "2000-01-23",
  "bodyLeftLeg" : 5.637376656633329,
  "dicksonMetric" : 4.145608029883936,
  "bodyRightArm" : 5.962133916683182,
  "customerId" : { },
  "bodyNeck" : 7.061401241503109,
  "bodyLeftLegThigh" : 2.027123023002322,
  "height" : 6.027456183070403
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
  "bodyRightLeg" : 2.3021358869347655,
  "bodyRightLegThigh" : 3.616076749251911,
  "bodyLeftArm" : 1.4658129805029452,
  "bodyHip" : 9.301444243932576,
  "weight" : 0.8008281904610115,
  "measurementDate" : "2000-01-23",
  "bodyLeftLeg" : 5.637376656633329,
  "dicksonMetric" : 4.145608029883936,
  "bodyRightArm" : 5.962133916683182,
  "customerId" : { },
  "bodyNeck" : 7.061401241503109,
  "bodyLeftLegThigh" : 2.027123023002322,
  "height" : 6.027456183070403
}, {
  "bodyRightLeg" : 2.3021358869347655,
  "bodyRightLegThigh" : 3.616076749251911,
  "bodyLeftArm" : 1.4658129805029452,
  "bodyHip" : 9.301444243932576,
  "weight" : 0.8008281904610115,
  "measurementDate" : "2000-01-23",
  "bodyLeftLeg" : 5.637376656633329,
  "dicksonMetric" : 4.145608029883936,
  "bodyRightArm" : 5.962133916683182,
  "customerId" : { },
  "bodyNeck" : 7.061401241503109,
  "bodyLeftLegThigh" : 2.027123023002322,
  "height" : 6.027456183070403
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets an exercise by ID
 *
 * exerciseId Long The exercise id
 * returns List
 **/
exports.getExerciseById = function(exerciseId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "exerciseId" : { },
  "sets" : 1,
  "exerciseTag" : [ "", "" ],
  "exerciseType" : "exerciseType",
  "name" : "name",
  "exerciseEstDuration" : 5,
  "description" : "description",
  "equipmentRequired" : "equipmentRequired",
  "setBreak" : 0,
  "repetitions" : 6,
  "musclesTargeted" : "musclesTargeted"
}, {
  "exerciseId" : { },
  "sets" : 1,
  "exerciseTag" : [ "", "" ],
  "exerciseType" : "exerciseType",
  "name" : "name",
  "exerciseEstDuration" : 5,
  "description" : "description",
  "equipmentRequired" : "equipmentRequired",
  "setBreak" : 0,
  "repetitions" : 6,
  "musclesTargeted" : "musclesTargeted"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
