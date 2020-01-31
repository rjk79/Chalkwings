const express = require('express');
const router = express.Router();
const passport = require('passport');

const Challenge = require('../../models/Challenge');

router.post('/',
    passport.authenticate('jwt', { session: false }), //authenticate request
    (req, res) => {

        const newChallenge = new Challenge({
            challenger: req.body.challenger,
            challenged: req.body.challenged,
            discipline: req.body.discipline,
            duration: req.body.duration,
            wager: req.body.wager,
        });

        newChallenge.save().then(challenge => res.json(challenge));
    }
);

module.exports = router;