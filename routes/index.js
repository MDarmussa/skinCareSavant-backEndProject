const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require("axios").default;
const router = express.Router();
require('dotenv').config();
const isValidToken = require('../middleware/isValidToken')
const { User, Comments, Quiz, product } = require('../models');
const comments = require('../models/comments');
const { use } = require('./users');
const Sequelize = require('sequelize');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
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


router.get('skintype/:id', isValidToken, async (req, res, next) => {
  const {id} = req.req.params;
  const user = await User.findOne({
    where: {
      id:id
    },
  })
  res.render('profile', {user:user})
})

router.get('/quiz/:id', isValidToken, async (req, res, next) => {
  const {id} = req.params;
  const user = await User.findOne({
    where:{
      id: id
    },
  })
  res.render('profile', {user: user})
})



module.exports = router;
