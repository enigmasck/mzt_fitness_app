const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
    exercise_id: String,
    name: String,
    description: String,
    equipment_required: {type: String, default:"None"},
    exercise_type: {type: String, enum:['AEROBIC','BALANCE','STRETCHING','STRENGTHENING']},
    muscles_targeted: {type: String, default:"Not defined"},
    set_break: {type: Number, default:0},
    repetition: {type: Number, default:0},
    time: {type: Number, default:0},
    set_type: {type: String, enum:['TIME','REPETITION','TIME_REPETITION']},
    sets: {type: Number, default:0},
    exercise_est_duration: {type: Number, default:0},
    session: {type: mongoose.Schema.Types.ObjectId, ref: 'SessionTemplate'},
    exercise_img_url: String,
    exercise_tag: Array
}, {
    timestamp: true
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
