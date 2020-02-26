const express = require('express');
const router = express.Router();
const passport = require('passport');

const Sport = require('../../models/Sport');
const validateSportInput = require('../../validation/sports');
// index
router.get('/', (req, res) => {
    Sport.find()
        .sort({ date: -1 })
        .then(sports => res.json(sports))
        .catch(err => res.status(404).json({ nosportsfound: 'No sports found' }));
});

// user's sports
router.get('/user/:user_id', (req, res) => {
    Sport.find({ user: req.params.user_id })
        .sort({ date: -1 })
        .then(sports => res.json(sports))
        .catch(err =>
            res.status(404).json({ nosportsfound: 'No sports found from that user' }
            )
        );
});
//user's sports from this month
router.get('/user/:user_id/month', (req, res) => {
    var d = new Date();
    d.setMonth(d.getMonth() - 1); //1 month ago
    Sport.find({ $and: [{ date: { $gte: d } }, { user: req.params.user_id }] })
        .then(sports => res.json(sports))
        .catch(err =>
            res.status(404).json({ nosportsfound: 'No sports found from that user' }
            )
        );
});
// show
router.get('/:id', (req, res) => {
    Sport.findById(req.params.id)
        .then(sport => res.json(sport))
        .catch(err =>
            res.status(404).json({ nosportfound: 'No sport found with that ID' })
        );
});
// create
router.post('/',
    passport.authenticate('jwt', { session: false }), //authenticate request
    (req, res) => {
        const { errors, isValid } = validateSportInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newSport = new Sport({
            name: req.body.name,
            grade: req.body.grade,
            user: req.user.id
        });

        newSport.save().then(sport => res.json(sport));
    }
);


module.exports = router;