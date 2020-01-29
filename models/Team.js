const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    captain:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    symbol:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Team = mongoose.model('team', TeamSchema);