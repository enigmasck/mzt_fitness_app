const mongoose = require('mongoose')

const ExerciseInSessionTemplateSchema = mongoose.Schema({
	exercise_id: String,
        session_template_id: String,
}, {
	timestamp: true
});

module.exports = mongoose.model('ExerciseInSessionTemplate', ExerciseInSessionTemplateSchema)