const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require("axios").default;
const router = express.Router();
require('dotenv').config();
const isValidToken = require('../middleware/isValidToken')
const {User} = require('../models');

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
