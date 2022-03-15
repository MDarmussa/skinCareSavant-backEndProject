var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR))
const Sequelize = require('sequelize');
const { User } = require('../models');
const db = require("../models");
const jwt = require('jsonwebtoken');
const { user } = require('pg/lib/defaults');
require('dotenv').config();




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST users Register. */
router.post('/register', async (req, res, next) => {
  let { name, username, password, email} = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  console.log(username, password);

  const newUser = await User.create({
    name,
    username,
    password: hashedPassword,
    email
  });
  res.json(newUser);
});



//post user login 

router.post('/login', async (req, res, next) => {
  let { username, password} = req.body;

  const newUser = await User.findOne({
    where:{
      username: username
    } 
  });
  if (newUser){
    const comparePass = bcrypt.compareSync(password, newUser.password)
    if (comparePass === true) {
      const token = jwt.sign(
        {
          data: newUser.username,
        },
        process.env.SECRET_KEY,
        {expiresIn: "1h"}
      );
      res.cookie("token", token)
      res.redirect(`/profile/${newUser.id}`);

    } else {
      res.send('wrong pass')
    }

  } else {
    res.send("sorry, no user found")
  }
});





module.exports = router;
