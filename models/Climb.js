const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClimbSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Climb = mongoose.model('climb', ClimbSchema);