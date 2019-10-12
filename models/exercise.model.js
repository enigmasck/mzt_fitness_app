const mongoose = require('mongoose')

const ExerciseSchema = mongoose.Schema({
	exercise_id: String,
        name: String,
        description: String,
        equipement_required: String,
        exercise_type: String,
        muscles_targeted: String,
        set_break: Number,
        repetition: Number,
        sets: Number,
        exercise_est_duration: Number,   
        exercise_tag: Array
}, {
	timestamp: true
});

module.exports = mongoose.model('Exercise', ExerciseSchema)