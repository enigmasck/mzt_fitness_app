const mongoose = require('mongoose');

const ExerciseHasSessionSchema = mongoose.Schema({
	exercise_id: String,
        session_id: String,
        start_time: Date,   
        completed_time: Date
}, {
	timestamp: true
});

module.exports = mongoose.model('ExerciseHasSession', ExerciseHasSessionSchema);