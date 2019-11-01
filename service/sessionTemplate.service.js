const SessionTemp = require('../models/sessionTemplate.model.js');

exports.findAll = function() {
  return new Promise(function(resolve, reject) {
    SessionTemp.find()
    .then(sessions => {
        resolve(sessions);
    }).catch(err => {
        reject("Some error occured while retrieving session templates: " + err);
    });
});
};

exports.findAllByProgId = function(progId) {
  return new Promise(function(resolve, reject) {
    var query = {'program_id' : progId};
    SessionTemp.find(query)
    .then(sessions => {
        resolve(sessions);
    }).catch(err => {
        reject("Some error occured while retrieving session templates: " + err);
    });
});
};

exports.findOne = function(sessId) {
  return new Promise(function(resolve, reject) {
    SessionTemp.findById(sessId)
    .then(sessions => {
        if(!sessions) {
            reject("Session template not found with id " + sessId);           
        }
        res.send(sessions);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            reject("Session template not found with id " + sessId);               
        }
        reject("Error retrieving session template with id " + sessId);
    });
});
};

exports.create = function(sessTemp) {
  return new Promise(function(resolve, reject) {
    // Validate request
    if(!sessTemp) {
        reject("Session template content can not be empty");
    }

    const session = new SessionTemp({
        name: sessTemp['name'] || "Untitled Session Template", 
        session_type: sessTemp['session_type'] || "NA",
        session_coach_notes: sessTemp['session_coach_notes'] || "NA",
        program_template_id: sessTemp['program_template_id'] || "NA",
        coach_id: sessTemp['coach_id'] || "NA",
        exercise_tag: sessTemp['exercise_tag'] || "NA"
    });

    session.save()
    .then(data => {
        resolve(data);
    }).catch(err => {
        reject("Some error occurred while creating the session." + err);
    });
});
};

exports.update = function(sessTemp) {
  return new Promise(function(resolve, reject) {
    // Validate Request
    if(!sessTemp) {
        reject("Session template content can not be empty");
    }

    SessionTemp.findByIdAndUpdate(sessTemp['session_id'], {
        name: sessTemp['name'] || "Untitled Session Template", 
        session_type: sessTemp['session_type'] || "NA",
        session_coach_notes: sessTemp['session_coach_notes'] || "NA",
        program_template_id: sessTemp['program_template_id'] || "NA",
        coach_id: sessTemp['coach_id'] || "NA",
        exercise_tag: sessTemp['exercise_tag'] || "NA"
    }, {new: true})
    .then(sessions => {
        if(!sessions) {
            reject("Session template not found with id " + sessTemp['session_id']);
        }
        resolve(sessions);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            reject("Session template not found with id " + sessTemp['session_id']);            
        }
        reject("Session template not found with id " + sessTemp['session_id']);
    });
});
};

exports.delete = function(sessId) {
  return new Promise(function(resolve, reject) {
    SessionTemp.findByIdAndRemove(sessId)
    .then(sessions => {
        if(!sessions) {
            reject("Session template not found with id " + sessId); 
        }
        resolve("Session template deleted successfully!");
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            reject("Session template not found with id " + sessId + " error: " + err);                
        }
        reject("Session template not found with id " + sessId + " error: " + err); 
    });
});
};