const express = require('express');
const router = express.Router();
const passport = require('passport');

const Follow = require('../../models/Follow');
// const validateFollowInput = require('../../validation/follows');
// index
router.get('/', (req, res) => {
    Follow.find()
        .sort({ date: -1 })
        .then(follows => res.json(follows))
        .catch(err => res.status(404).json({ nofollowsfound: 'No follows found' }));
});

// user's follows
router.get('/user/:user_id', (req, res) => {
    Follow.find({ user: req.params.user_id })
        .then(follows => res.json(follows))
        .catch(err =>
            res.status(404).json({ nofollowsfound: 'No follows found from that user' }
            )
        );
});

// show
router.get('/:id', (req, res) => {
    Follow.findById(req.params.id)
        .then(follow => res.json(follow))
        .catch(err =>
            res.status(404).json({ nofollowfound: 'No follow found with that ID' })
        );
});
// create
router.post('/',
    passport.authenticate('jwt', { session: false }), //authenticate request
    (req, res) => {
        const { errors, isValid } = validateFollowInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newFollow = new Follow({
            name: req.body.name,
            grade: req.body.grade,
            user: req.user.id
        });

        newFollow.save().then(follow => res.json(follow));
    }
);


module.exports = router;