const express = require('express');
const router = express.Router();
const passport = require('passport');

const Message = require('../../models/Message');

// index
router.get('/', (req, res) => {
    Message.find()
        .sort({ date: 1 })
        .then(messages => res.json(messages))
        .catch(err => res.status(404).json({ nomessagesfound: 'No messages found' }));
});

// create
router.post('/',
    passport.authenticate('jwt', { session: false }), //authenticate request
    (req, res) => {
        console.log(req.body)

        const newMessage = new Message({
            user: req.user.id,
            username: req.body.username,
            text: req.body.text,
        });
        newMessage.save().then(message => res.json(message));
    }
);

module.exports = router;
