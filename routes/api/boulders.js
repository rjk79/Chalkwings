const express = require('express');
const router = express.Router();
const passport = require('passport');

const Boulder = require('../../models/Boulder');
const validateBoulderInput = require('../../validation/boulders');
// index
router.get('/', (req, res) => {
    Boulder.find()
        .sort({ date: -1 })
        .then(boulders => res.json(boulders))
        .catch(err => res.status(404).json({ nobouldersfound: 'No boulders found' }));
});

// user's boulders
router.get('/user/:user_id', (req, res) => {
    Boulder.find({ user: req.params.user_id })
        .sort({ date: -1 })
        .then(boulders => res.json(boulders))
        .catch(err =>
            res.status(404).json({ nobouldersfound: 'No boulders found from that user' }
            )
        );
});
//user's boulders from this month
router.get('/user/:user_id/month', (req, res) => {
    var d = new Date();
    d.setMonth(d.getMonth() - 1); //1 month ago
    Boulder.find({ $and: [{ date: { $gte: d } }, { user: req.params.user_id }] })
        .then(boulders => res.json(boulders))
        .catch(err =>
            res.status(404).json({ nobouldersfound: 'No boulders found from that user' }
            )
        );
});
// show
router.get('/:id', (req, res) => {
    Boulder.findById(req.params.id)
        .then(boulder => res.json(boulder))
        .catch(err =>
            res.status(404).json({ noboulderfound: 'No boulder found with that ID' })
        );
});
// create
router.post('/',
    passport.authenticate('jwt', { session: false }), //authenticate request
    (req, res) => {
        const { errors, isValid } = validateBoulderInput(req.body);
        
        if (!isValid) {
            return res.status(400).json(errors);
        }
        
        const newBoulder = new Boulder({
            name: req.body.name,
            grade: req.body.grade,
            user: req.user.id
        });

        newBoulder.save().then(boulder => res.json(boulder));
    }
);


module.exports = router;