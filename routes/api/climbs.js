const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');

const Climb = require('../../models/Climb');
const validateClimbInput = require('../../validation/climbs');
// index
router.get('/', (req, res) => {
    Climb.find()
        .sort({ date: -1 })
        .then(climbs => res.json(climbs))
        .catch(err => res.status(404).json({ noclimbsfound: 'No climbs found' }));
});

// user's climbs
router.get('/user/:user_id', (req, res) => {
    Climb.find({ user: req.params.user_id })
        .then(climbs => res.json(climbs))
        .catch(err =>
            res.status(404).json({ noclimbsfound: 'No climbs found from that user' }
            )
        );
});
// show
router.get('/:id', (req, res) => {
    Climb.findById(req.params.id)
        .then(climb => res.json(climb))
        .catch(err =>
            res.status(404).json({ noclimbfound: 'No climb found with that ID' })
        );
});
// create
router.post('/',
    passport.authenticate('jwt', { session: false }), //authenticate request
    (req, res) => {
        const { errors, isValid } = validateClimbInput(req.body);
        
        if (!isValid) {
            return res.status(400).json(errors);
        }
        
        const newClimb = new Climb({
            name: req.body.name,
            grade: parseInt(req.body.grade),
            user: req.user.id
        });

        newClimb.save().then(climb => res.json(climb));
    }
);
// TODO
// router.delete('/:id', (req, res) => {
//     Climb.findById(req.params.id)
//         .then(climb => res.json(climb))
//         .catch(err =>
//             res.status(404).json({ noclimbfound: 'No climb found with that ID' })
//         );
// });

module.exports = router;