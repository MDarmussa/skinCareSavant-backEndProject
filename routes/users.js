var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR))
const Sequelize = require('sequelize');
const { User, Comments } = require('../models');
const jwt = require('jsonwebtoken');
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
  res.json('/login');
});

//post user login 
router.post('/login', async (req, res, next) => {
  let { username, password} = req.body;

  const user = await User.findOne({
    where:{
      username: username
    } 
  });
  if (user){
    const comparePass = bcrypt.compareSync(password, user.password)
    if (comparePass === true) {
      const token = jwt.sign(
        {
          data: user.username,
        },
        process.env.SECRET_KEY,
        {expiresIn: "1h"}
      );
      res.cookie("token", token)
      res.redirect(`/profile/${user.id}`);

    } else {
      res.send('wrong pass')
    }

  } else {
    res.send("sorry, no user found")
  }
});

router.post('/profile', async (req, res) => {
  const {q1, q2, q3} = req.body;
  const userdata = await Profile.create({
    q1: q1,
    q2: q2,
    q3: q3
  })

  res.send(userdata);
})

//post a comment
router.post('/comment', async (req, res, next) => {
  let { name, title} = req.body;
  console.log(name, title);

  const newUser = await Comments.create({
    name,
    title
  });
  res.json(newUser);
});



module.exports = router;
