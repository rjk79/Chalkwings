const express = require('express');
const router = express.Router();
const passport = require('passport');

const Team = require('../../models/Team');
const User = require('../../models/User');
const Challenge = require('../../models/Challenge');

router.get('/:id/challenges', (req, res) => {
    Team.findById(req.params.id)
        .then(team => {
            Challenge.find({ $or: [{ team1: team._id }, { team2: team._id }]})
                .sort({ date: -1 })
                .then(challenges => res.json(challenges))
                .catch(err => res.status(404).json({ nochallengesfound: 'No challenges found' }));

        })
        .catch(err =>
            res.status(404).json({ noteamfound: 'No team found with that ID' })
        );
})

// index
router.get('/', (req, res) => {
    Team.find()
        .sort({ date: -1 })
        .then(teams => res.json(teams))
        .catch(err => res.status(404).json({ noteamsfound: 'No teams found' }));
});


// show
router.get('/:id', (req, res) => {
    Team.findById(req.params.id)
        .then(team => {
            User.find({ "_id": { '$in': team.members } })
                .then(members => {
                            members = members.map(member => {return {username: member.username, id: member.id}}) 
                            newMembers = {}
                            for (let i = 0; i < members.length;i++){
                                newMembers[members[i].id] = members[i]
                            }
                            return res.json({team, members: newMembers})}
                )
                .catch(err => res.status(404).json({ nomembersfound: 'No members found' }));
        })
        .catch(err =>
            res.status(404).json({ noteamfound: 'No team found with that ID' })
        );
});

// create
router.post('/',
    passport.authenticate('jwt', { session: false }), //authenticate request
    (req, res) => {
        const newTeam = new Team({
            name: req.body.name,
            captain: req.body.captain,
            symbol: req.body.symbol,
            color: req.body.color,
            members: req.body.members
        });

        newTeam.save().then(team => res.json(team));
    }
);

module.exports = router;