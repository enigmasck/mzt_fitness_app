const mongoose = require('mongoose');

const ChallengeSchema = mongoose.Schema({
    challenge_id: String,
    name: String,
    type: {type: String, enum:['Lifestyle','Eating','Fitness','Attendance']},
    difficulty: {type: String, enum:['EASY','MODERATE','DIFFICULT','EXTREMELY DIFFICULT']},
    description: String,
    points: Number
}, {
    timestamp: true
});

module.exports = mongoose.model('Challenge', ChallengeSchema);