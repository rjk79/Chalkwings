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
router.get('/followed/:user_id', (req, res) => {
    Follow.find({ follower: req.params.user_id })
        .then(follows => res.json(follows))
        .catch(err =>
            res.status(404).json({ nofollowsfound: 'No follows found from that user' }
            )
        );
});
// user's followers
router.get('/followers/:user_id', (req, res) => {
    Follow.find({ followed: req.params.user_id })
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
        // const { errors, isValid } = validateFollowInput(req.body);

        // if (!isValid) {
        //     return res.status(400).json(errors);
        // }

        const newFollow = new Follow({
            follower: req.user.id,
            followed: req.body.followed,
        });

        newFollow.save().then(follow => res.json(follow));
    }
);

router.delete('/:user_id', (req, res) => {
    Follow.deleteOne({
        follower: req.user.id,
        followed: req.params.user_id
    }, function (err) {
        if (err) {
            res.status(404).json({ nofollowfound: 'No follow found with those IDs' })
        };
        // deleted at most one tank document
    })
        
})


module.exports = router;