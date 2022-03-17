const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require("axios").default;
const router = express.Router();
require('dotenv').config();
const isValidToken = require('../middleware/isValidToken')
const {User, Comments} = require('../models');
const { use } = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

//shayma - login route
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});



// comments route
router.get('/comment', function(req, res, next) {

  res.render('comment');
})

// router.get('/comment/:id', async function(req, res, next) {
//   const {id} = req.params;
//   // const name = req.body
//   const comments = await Comments.findAll({
//     where:{
//       id:id,
//     }
//   });
//   res.render('comment', { name: comments.name });
// });


//shayma - profile route -auth is work- middleware
router.get('/profile/:id', isValidToken, async function(req, res, next) {
  const {id} = req.params;
  const user = await User.findOne({
    where:{
      id:id
    }
  });
  res.render('profile', { name: user.username });
});


module.exports = router;
