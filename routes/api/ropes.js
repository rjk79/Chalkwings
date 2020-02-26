const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');

const Rope = require('../../models/Rope');
// index
router.get('/', (req, res) => {
    Rope.find()
        .sort({ date: -1 })
        .then(ropes => res.json(ropes))
        .catch(err => res.status(404).json({ noropesfound: 'No ropes found' }));
});

// user's ropes
router.get('/user/:user_id', (req, res) => {
    Rope.find({ user: req.params.user_id })
        .sort({ date: -1 })
        .then(ropes => res.json(ropes))
        .catch(err =>
            res.status(404).json({ noropesfound: 'No ropes found from that user' }
            )
        );
});
//user's ropes from this month
router.get('/user/:user_id/month', (req, res) => {
    var d = new Date();
    d.setMonth(d.getMonth() - 1); //1 month ago
    Rope.find({ $and: [{ date: { $gte: d } }, { user: req.params.user_id }] })
        .then(ropes => res.json(ropes))
        .catch(err =>
            res.status(404).json({ noropesfound: 'No ropes found from that user' }
            )
        );
});


// show
router.get('/:id', (req, res) => {
    Rope.findById(req.params.id)
        .then(rope => res.json(rope))
        .catch(err =>
            res.status(404).json({ noropefound: 'No rope found with that ID' })
        );
});
// create
router.post('/',
    passport.authenticate('jwt', { session: false }), //authenticate request
    (req, res) => {

        const newRope = new Rope({
            name: req.body.name,
            grade: req.body.grade,
            user: req.user.id
        });

        newRope.save()
            .then(rope => res.json(rope), 
                err => console.log(err)
            );
    }
);


module.exports = router;