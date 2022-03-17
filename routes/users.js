var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR))
const Sequelize = require('sequelize');
const { User, Comments, Quiz, product } = require('../models');
const jwt = require('jsonwebtoken');
const isValidToken = require('../middleware/isValidToken')
require('dotenv').config();
const axios = require('axios');






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


/* GET Profile */
router.post('/quiz', isValidToken, async (req, res, next) => {
  // const {id} = req.params;
  // const user = await User.findOne({
  //   where: {
  //     id:id,
  //   }
  // })
  const {q1, q2, q3} = req.body;
  const quizData = await Quiz.create({
    question1: q1,
    question2: q2,
    question3: q3
  })
  res.json(quizData);
})

//Post the API into our db
router.get('/skintype/:id', async function(req, res, next) {
  const id = req.params.id
  var config = {
    method: 'get',
    url: `https://skincare-api.herokuapp.com/products/${id}`,
    headers: { }
  };

  const products = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

    const addProduct = await product.create({
      brandBrand: products.data.brand,
      brandName: products.data.name,
      // brandIngredients: 
      // `<ul>
      //     <li>${products.data.brandIngredients[0]}</li>
      //     <li>${products.data.brandIngredients[1]}</li>
      //     <li>${products.data.brandIngredients[2]}</li>
      //     <li>${products.data.brandIngredients[3]}</li>
      //     <li>${products.data.brandIngredients[4]}</li>
      //     <li>${products.data.brandIngredients[5]}</li>
      //     <li>${products.data.brandIngredients[6]}</li>
      // </ul`
    })
    res.json(products.data.brand)
});




// post the user quiz into db 
router.post('/quiz', isValidToken, async (req, res, next) => {
  const {q1, q2, q3} = req.body;
  var quizValues = req.render('profile')
  if (quizValues.value == 1 || quizValues == 1)

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
