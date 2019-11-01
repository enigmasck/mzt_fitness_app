const Session = require('../models/session.model.js');

exports.findAll = (req, res) => {
    Session.find()
    .then(sessions => {
        res.send(sessions);
    }).catch(err => {
        reject("Some error occured while retrieving sessions.");
    });
};

exports.findAllByProgId = function(progId) {
  return new Promise(function(resolve, reject) {
        console.log('prog id = ' + progId);
        var query = {'program_id' : progId};
        Session.find(query)
        .then(sessions => {
            resolve(sessions);
        }).catch(err => {
            reject("Some error occured while retrieving sessions.");
        });
    });
};
exports.findOne = function(sessId) {
  return new Promise(function(resolve, reject) {
    Session.findById(sessId)
    .then(sessions => {
        if(!sessions) {
            reject("Session not found with id " + sessId);            
        }
        resolve(sessions);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            reject("Session not found with id " + sessId);                
        }
        reject("Error retrieving session with id " + sessId);
    });
});
};

// Create and save a new session
exports.create = function(sess) {
  return new Promise(function(resolve, reject) {
    // Validate request
    if(!sess) {
        resolve("Session content can not be empty");
    }
    console.log("exercise tags= " + sess['exercise_tag']);
    // Create a session
    const session = new Session({
        name: sess['name'] || "Untitled Session", 
        session_type: sess['session_type'] || "NA",
        session_start_date: sess['session_start_date'] || "2000/01/10",
        session_end_date: sess['session_end_date'] || "2000/01/10",
        session_coach_notes: sess['session_coach_notes'] || "NA",
        session_customer_feedback: sess['session_customer_feedback'] || "NA",
        program_id: sess['program_id'] || "NA",
        coach_id: sess['coach_id'] || "NA",
        customer_id: sess['customer_id'] || "NA",
        exercise_tag: sess['exercise_tag'] || "NA",
        measurement_date: sess['measurement_date'] || "2000/01/10"
    });

    // Save the session in the database
    session.save()
    .then(data => {
        resolve(data);
    }).catch(err => {
        reject("Some error occurred while creating the session: " + err);
    });
});
};

// Update a session identified by the session_id in the request
exports.update = function(sess) {
  return new Promise(function(resolve, reject) {
    // Validate Request
    if(!sess) {return reject("Session content can not be empty");}

    // Find session and update it with the request body
    Session.findByIdAndUpdate(sess['session_id'], {
        name: sess['name'] || "Untitled Session", 
        session_type: sess['session_type'] || "NA",
        session_start_date: sess['session_start_date'] || "2000/01/10",
        session_end_date: sess['session_end_date'] || "2000/01/10",
        session_coach_notes: sess['session_coach_notes'] || "NA",
        session_customer_feedback: sess['session_customer_feedback'] || "NA",
        program_id: sess['program_id'] || "NA",
        coach_id: sess['coach_id'] || "NA",
        customer_id: sess['customer_id'] || "NA",
        exercise_tag: sess['exercise_tag'] || "NA",
        measurement_date: sess['measurement_date'] || "2000/01/10"
    }, {new: true})
    .then(sessions => {
        if(!sessions) {
            reject("Session not found with id " + sess['session_id']);
        }
        resolve(sessions);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            reject("Session not found with id " + sess['session_id']);                
        }
        reject("Error updating session with id " + sess['session_id']);
    });
});
};

// Delete a session with the specified session_id in the request
exports.delete = function(sessId) {
  return new Promise(function(resolve, reject) {
    
    Session.findByIdAndRemove(sessId)
    .then(sessions => {
        if(!sessions) {reject("Session not found with id " + sessId);}
        resolve("Session deleted successfully!");
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            reject("Session not found with id " + sessId);                
        }
        reject("Could not delete session with id " + sessId);
    });
});
};