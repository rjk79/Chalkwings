const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SportSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Sport = mongoose.model('sport', SportSchema);