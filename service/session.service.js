const Session = require('../models/session.model.js');

exports.findAll = (req, res) => {
    Session.find()
    .then(sessions => {
        res.send(sessions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving sessions."
        });
    });
};

exports.findAllByProgId = (req, res) => {
    var query = {'program_id' : req.params.program_id};
    Session.find(query)
    .then(sessions => {
        res.send(sessions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving sessions."
        });
    });
};

exports.findOne = (req, res) => {
    Session.findById(req.params.session_id)
    .then(sessions => {
        if(!sessions) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.session_id
            });            
        }
        res.send(sessions);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.session_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving session with id " + req.params.session_id
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

    // Create a session
    const session = new Session({
        name: sess['name'] || "Untitled Session", 
        sessin_type: sess['session_type'] || "NA",
        session_start_date: sess['ssession_start_date'] || "2000/01/10",
        session_end_date: sess['ssession_end_date'] || "2000/01/10",
        session_coach_notes: sess['ssession_coach_notes'] || "NA",
        session_customer_feedback: sess['session_customer_feedback'] || "NA",
        program_id: sess['program_id'] || "NA",
        coach_id: sess['coach_id'] || "NA",
        exercise_tag: sess['req.body.exercise_tag'] || "NA",
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
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Session content can not be empty"
        });
    }

    // Find session and update it with the request body
    Session.findByIdAndUpdate(req.params.session_id, {
        name: req.body.name || "Untitled Session",
        content: req.body.content
    }, {new: true})
    .then(sessions => {
        if(!sessions) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.session_id
            });
        }
        res.send(sessions);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.session_id
            });                
        }
        return res.status(500).send({
            message: "Error updating session with id " + req.params.session_id
        });
    });
};

// Delete a session with the specified session_id in the request
exports.delete = (req, res) => {
    Session.findByIdAndRemove(req.params.session_id)
    .then(sessions => {
        if(!sessions) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.session_id
            });
        }
        res.send({message: "Session deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.session_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete session with id " + req.params.session_id
        });
    });
};