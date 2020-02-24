const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    message: {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Notification = mongoose.model('notification', NotificationSchema);