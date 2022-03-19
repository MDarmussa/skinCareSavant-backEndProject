var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');
const { User, Comments, Quiz, Product, Skintype } = require('../models');
const jwt = require('jsonwebtoken');
const isValidToken = require('../middleware/isValidToken')
require('dotenv').config();
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR))



/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
});

/* POST users Register. */
router.post('/register', async (req, res, next) => {
  let { name, username, password, email} = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  console.log(username, password);

  const newUser = await User.create({
    name,
    email,
    username,
    password: hashedPassword, 
  });
  res.json('/login');
});

//shayma -post user login 
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
  // res.redirect('profile')
});


router.post('/quiz', async (req, res, next) => {
  const {q1, q2, q3} = req.body;
  const quizData = await Quiz.create({
    question1: q1,
    question2: q2,
    question3: q3
  })

  const quizResult = ((q1+q2+q3)/3)
  if(quizResult < 3) {
    res.send(`/profile/ You have a dry skin `);
  } else if (quizResult < 7) {
    res.send(`/profile/ You have a normal skin `);
  } else {
    res.send(`/profile/ You have a Oily skin `);
  }
})


//Get product
router.get('/products', async function (req, res, next) {
  const { brand, productName, ingredients, url } = req.body;
  const addItem = await Product.findAll({
    brand: brand,
    productName:productName,
    ingredients: ingredients,
    url:url
  });
  res.redirect("/profile");
})


// shayma post the user comment
router.post('/comment', async (req, res, next) => {
  let { name, title} = req.body;
  console.log(name, title);

  const newComment = await Comments.create({
    name,
    title
  });
  res.json({
    name: newComment.name,
    title: newComment.title
  });

});


module.exports = router;

