const express = require('express');
const axios = require("axios").default;
const router = express.Router();
require('dotenv').config();
const isValidToken = require('../middleware/isValidToken')
const {User} = require('../models');
const comments = require('../models/comments');
const { use } = require('./users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

//comments route
router.get('/comment',  function(req, res, next) {
  res.render('comment');
});


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
