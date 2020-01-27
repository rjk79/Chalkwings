const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const passport = require('passport');


const Workout = require('../../models/Workout');

// index
router.get('/', (req, res) => {
    Workout.find()
        .sort({ date: -1 })
        .then(workouts => res.json(workouts))
        .catch(err => res.status(404).json({ noworkoutsfound: 'No workouts found' }));
});

// user's workouts
router.get('/user/:user_id', (req, res) => {
    Workout.find({ user: req.params.user_id })
        .then(workouts => res.json(workouts))
        .catch(err =>
            res.status(404).json({ noworkoutsfound: 'No workouts found from that user' }
            )
        );
});
// show
router.get('/:id', (req, res) => {
    Workout.findById(req.params.id)
        .then(workout => res.json(workout))
        .catch(err =>
            res.status(404).json({ noworkoutfound: 'No workout found with that ID' })
        );
});
// create
router.post('/',
    passport.authenticate('jwt', { workout: false }), //authenticate request
    (req, res) => {

        const newWorkout = new Workout({
            user: req.user.id,
            points: req.body.points,
        });

        newWorkout.save().then(workout => res.json(workout));
    }
);

module.exports = router;