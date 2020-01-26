const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Climb = require('../../models/Climb');
const validateClimbInput = require('../../validation/climbs');

router.get('/', (req, res) => {
    Climb.find()
        .sort({ date: -1 })
        .then(climbs => res.json(climbs))
        .catch(err => res.status(404).json({ noclimbsfound: 'No climbs found' }));
});

router.get('/user/:user_id', (req, res) => {
    Climb.find({ user: req.params.user_id })
        .then(climbs => res.json(climbs))
        .catch(err =>
            res.status(404).json({ noclimbsfound: 'No climbs found from that user' }
            )
        );
});

router.get('/:id', (req, res) => {
    Climb.findById(req.params.id)
        .then(climb => res.json(climb))
        .catch(err =>
            res.status(404).json({ noclimbfound: 'No climb found with that ID' })
        );
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateClimbInput(req.body);

        if (!isValid) {
            debugger
            return res.status(400).json(errors);
        }

        const newClimb = new Climb({
            name: req.body.name,
            user: req.user.id
        });

        newClimb.save().then(climb => res.json(climb));
    }
);

module.exports = router;