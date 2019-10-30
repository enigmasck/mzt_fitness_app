const SessionTemp = require('../models/sessionTemplate.model.js');

exports.findAll = (req, res) => {
    SessionTemp.find()
    .then(sessions => {
        res.send(sessions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving session templates."
        });
    });
};

exports.findAllByProgId = (req, res) => {
    var query = {'program_id' : req.params.program_id};
    SessionTemp.find(query)
    .then(sessions => {
        res.send(sessions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving session templates."
        });
    });
};

exports.findOne = (req, res) => {
    SessionTemp.findById(req.params.session_template_id)
    .then(sessions => {
        if(!sessions) {
            return res.status(404).send({
                message: "Session template not found with id " + req.params.session_template_id
            });            
        }
        res.send(sessions);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session template not found with id " + req.params.session_template_id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving session template with id " + req.params.session_template_id
        });
    });
};

exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Session template content can not be empty"
        });
    }

    const session = new SessionTemp({
        name: req.body.name || "Untitled Session Template", 
        sessin_type: req.body.sessin_type || "NA",
        session_start_date: req.body.session_start_date || "NA",
        session_end_date: req.body.session_end_date || "NA",
        session_coach_notes: req.body.session_coach_notes || "NA",
        session_customer_feedback: req.body.session_customer_feedback || "NA",
        program_id: req.body.program_id || "NA",
        coach_id: req.body.coach_id || "NA",
        exercise_tag: req.body.exercise_tag || "NA",
        measurement_date: req.body.measurement_date || "NA",
    });

    session.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the session."
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Session template content can not be empty"
        });
    }

    SessionTemp.findByIdAndUpdate(req.params.session_template_id, {
        name: req.body.name || "Untitled Session Template",
        content: req.body.content
    }, {new: true})
    .then(sessions => {
        if(!sessions) {
            return res.status(404).send({
                message: "Session template not found with id " + req.params.session_template_id
            });
        }
        res.send(sessions);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session template not found with id " + req.params.session_template_id
            });                
        }
        return res.status(500).send({
            message: "Error updating session template with id " + req.params.session_template_id
        });
    });
};

exports.delete = (req, res) => {
    SessionTemp.findByIdAndRemove(req.params.session_template_id)
    .then(sessions => {
        if(!sessions) {
            return res.status(404).send({
                message: "Session template not found with id " + req.params.session_template_id
            });
        }
        res.send({message: "Session template deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Session template not found with id " + req.params.session_template_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete session template with id " + req.params.session_template_id
        });
    });
};