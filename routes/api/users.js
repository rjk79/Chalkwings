const express = require("express");
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const Boulder = require('../../models/Boulder');
const Rope = require('../../models/Rope');


const router = express.Router();

router.post('/register', (req, res) => {
    // validate
    const { errors, isValid } = validateRegisterInput(req.body);
    
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // prevent duplicate username
    User.findOne({ username: req.body.username })
        .then(user => {
            if (user) {
                // error if username address already exists
                return res.status(400).json({ username: "A user has already registered with this address" })
            } else {
                // create a new user
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                })
                // hash the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                const payload = { id: user.id, username: user.username };
                                // sign token
                                jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                                    res.json({
                                        success: true,
                                        token: "Bearer " + token
                                    });
                                });
                            })
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

router.post('/login', (req, res) => {
    // validate
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ username: 'This user does not exist' });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = { id: user.id, username: user.username };
                        // sign token
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            // set the key to expire in one hour
                            { expiresIn: 3600 },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        return res.status(400).json({ password: 'Incorrect password' });
                    }
                })
        })
})

// private route
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
    });
})

router.get('/search/:query', (req, res) => {
    const query = req.params.query;
    
    User.find({ username: { $regex: `${query}.*`, $options: 'i' } })
        .then(users => res.json(users.map(user => 
        {
            return {
                id: user.id, 
                username: user.username
            }}
        )))
        .catch(err =>
            res.status(404).json({ nousersfound: 'No users found' }
            )
        );
    
})
router.get('/', (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err =>
        res.status(404).json({ nousersfound: 'No users found' }
        )
    );
})
router.get('/:id', (req, res)=> {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err =>
            res.status(404).json({ nousersfound: 'No users found' }
            )
        );
})
//delete user's boulders
router.delete('/:id/boulders', (req, res)=> {
            
    Boulder.deleteMany({ user: req.params.id }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})
//delete user's ropes
router.delete('/:id/ropes', (req, res)=> {

    Rope.deleteMany({ user: req.params.id }, function (err, result) { //need cb 
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
        
})

router.get('/:id/weekboulders', (req, res) => {
    
    Boulder.find({$and: [
        {date: {
            $gte: new Date(new Date() - (7 * 24 * 60 * 60 * 1000)) //7 days
        }}, 
        {user: req.params.id}
        ]})
        .then(boulders => res.json(boulders))
    
    .catch(err =>
        res.status(404).json({ nouserfound: 'No user found' }
        )
    );
})

router.get('/:id/weekropes', (req, res) => {
    
    Rope.find({$and: [
        {date: {
            $gte: new Date(new Date() - (7 * 24 * 60 * 60 * 1000)) //7 days
        }}, 
        {user: req.params.id}
        ]})
        .then(ropes => res.json(ropes))
        .catch(err =>
            res.status(404).json({ nouserfound: 'No user found' }
            )
        );
})

module.exports = router;