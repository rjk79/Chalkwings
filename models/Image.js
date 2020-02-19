const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    imageData: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },


})

module.exports = Image = mongoose.model('images', ImageSchema);
