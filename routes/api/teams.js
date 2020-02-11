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
            User.find({ "_id": { '$in': team.members } }) //find team members
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


router.get('/search/:query', (req, res) => {
    const query = req.params.query;

    Team.find({ name: { $regex: `${query}.*`, $options: 'i' } })
        .then(teams => res.json(teams))
        .catch(err =>
            res.status(404).json({ noteamfound: 'No team found' }
            )
        );

})

router.get('/:id/weekropes', (req, res) => {
    Team.findById(req.params.id)
        .then(team => 
            Rope.find({ //recent and belongs to team member
                $and: [ 
                    {date: {
                            $gte: new Date(new Date() - (14 * 24 * 60 * 60 * 1000)) //7 days
                        }}, 
                    {user: {$in: team.members}}
                ]
            })
            .then(ropes => res.json(ropes))
            .catch(err =>
                res.status(404).json({ noropesfound: 'No ropes found' }
                )
            )
        )
})

router.get('/:id/weekboulders', (req, res) => {
    Team.findById(req.params.id)
        .then(team => 
            Boulder.find({ //recent and belongs to team member
                $and: [ 
                    {date: {
                            $gte: new Date(new Date() - (14 * 24 * 60 * 60 * 1000)) //7 days
                        }}, 
                    {user: {$in: team.members}}
                ]
            })
            .then(boulders => res.json(boulders))
            .catch(err =>
                res.status(404).json({ nobouldersfound: 'No boulders found' }
                )
            )
        )
})

router.delete('/:id', (req, res) => {
    Team.findByIdAndDelete(req.params.id)
    .then(team => res.json(team))
    .catch(err =>
        res.status(404).json({ noteamsfound: 'No teams found' }
        )
    )
})

router.patch('/:id', (req, res) => {
    //{name: "happy"}
    //id, {field: value}, option to return new obj
    Team.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(team => res.json(team))
        .catch(err =>
            res.status(404).json({ noteamsfound: 'No teams found' }
            )
        )
})


module.exports = router;