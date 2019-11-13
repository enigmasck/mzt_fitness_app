const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
    exercise_id: String,
    name: String,
    description: String,
    equipement_required: String,
    exercise_type: {type: String, enum:['AEROBIC','BALANCE','STRETCHING','STRENGTHENING']},
    muscles_targeted: String,
    set_break: Number,
    repetition: Number,
    time: Number,
    set_type: {type: String, enum:['TIME','REPETITION','TIME_REPETITION']},
    sets: Number,
    exercise_est_duration: Number,
    session: {type: mongoose.Schema.Types.ObjectId, ref: 'SessionTemplate'},
    exercise_img_url: String,
    exercise_tag: Array
}, {
    timestamp: true
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
