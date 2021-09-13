const router = require('express').Router();
const { runInNewContext } = require('vm');
const { Post, User } = require('../../models');

//  get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// get a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create a post
router.post('/', (req, res) => {
    const { title, post_url, user_id } = req.body;
    Post.create({
        title: title,
        post_url: post_url,
        user_id: user_id
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//  Update a Post's title;

router.put('/:id', (req, res) => {
    Post.update(
        {
           title : req.body.title
        }, 
        {
        where: {
            id: req.params.id
        }
    }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json(({message: 'No post found with this id'}));
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)    
    });
});

// delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(404).json(err);
    });
});
module.exports = router;