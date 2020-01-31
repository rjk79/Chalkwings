const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
    challenger: {
        type: Schema.Types.ObjectId,
        ref: 'teams'
    },
    challenged: {
        type: Schema.Types.ObjectId,
        ref: 'teams'
    },
    pending: {
        type: Boolean,
        default: true
    },
    discipline: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    wager: {
        type: Number,
        required: true
    }, 
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Challenge = mongoose.model('challenge', ChallengeSchema);