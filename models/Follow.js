const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    followed: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Follow = mongoose.model('follow', FollowSchema);