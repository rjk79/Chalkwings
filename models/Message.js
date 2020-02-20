const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username: { //denormalize to save db queries. doesn't matter if user changes name since msgs have short ttl
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        expires: 172800 * 5, //store for 10 days
    }
});



module.exports = Message = mongoose.model('message', MessageSchema);