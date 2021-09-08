const router = require('express').Router();
const { User } = require('../../models');


//  GET /api/users
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// POST /api/users

    router.post('/', (req, res) => {
        // expects  {username: 'harry', email: 'harry@gmail.com', password:'pass1234'
        const {username, email, password} = req.body;
        // you can use deconstruct to simplify things
        User.create({
            username: username, //req.body.username,
            email: email, //req.body.email,
            password: password //req.body.password
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });


// PUT /api/users/1
router.put('/:id', (req, res) => {
    // expects  {username: 'harry', email: 'harry@gmail.com', password:'pass1234'
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]){
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//  DELETE /api/users/1

    router.delete('/:id', (req, res) =>{
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbUserData =>{
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });

module.exports = router;