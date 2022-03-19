var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const Sequelize = require('sequelize');
const { User, Comments, Quiz, Product, Skintype } = require('../models');
const jwt = require('jsonwebtoken');
const isValidToken = require('../middleware/isValidToken')
require('dotenv').config();
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR))
const axios = require('axios');
const { route } = require('express/lib/application');
const res = require('express/lib/response');


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


/* GET Profile */
router.post('/quiz', async (req, res, next) => {
  const {q1, q2, q3} = req.body;
  // const quizData = await Quiz.create({
  //   question1: q1,
  //   question2: q2,
  //   question3: q3
  // })
  //add logic to do math (if statement)

  let oneQuestion=q1;
  let twoQuestion=q2;
  let threeQuestion=q3;

  let quizResult = ((oneQuestion+ twoQuestion +threeQuestion )/3);

  if (quizResult<=3 ) { 
    res.send(`/profile/ You have dry skin `)
  } else if((quizResult  <= 5)) {
    res.send(`/profile/ You have normal skin `)

  } else {
    res.send(`/profile/ You have oily skin ${oneQuestion} ${twoQuestion} ${threeQuestion} the result is ${quizResult}`)
  }

  // if ((quizResult /  3)<=3 ) { 
  //   res.send(`/profile/ You have dry skin `)
  // } else if((quizResult /  3) <= 5) {
  //   res.send(`/profile/ You have normal skin `)

  // } else {
  //   res.send(`/profile/ You have oily skin ${quizResult}`)
  // }
  // res.json(quizData);
})



// Post the API into our db //cancel
// router.get('/product/:id', async function(req, res, next) {
//   const { id } = req.params

//   //get from product table based on skin_id

//   var config = {
//     method: 'get',
//     url: `https://skincare-api.herokuapp.com/products/${id}`,
//     headers: { },
//   };

//   //render(GET) products from product table to the profile page, then update the user profile with recommended products (note)

//   const products = await axios(config)
//     .then(function (response) {
//       return response.data;
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//     console.log(products)
//     const addProduct = await product.create({
//       user_id:id,
//       brand: products.brand,
//       productName: products.name,
//       ingredients: products.ingredient_list
//     })
//     res.json('product added', addProduct)
// });

//router to get product based on user id
//




// post the user quiz into db //cancel
router.post('/quiz', isValidToken, async (req, res, next) => {
  const {q1, q2, q3} = req.body;
  var quizValues = req.render('profile')
  if (quizValues.value == 1 || quizValues == 1)

  res.send(userdata);
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


//POST Product to SQL Table
router.post('/products', async (req, res) => {
  const { brand, productName, ingredients, url } = req.body;
  const addItem = await Product.create({
    brand: brand,
    productName:productName,
    ingredients: ingredients,
    url:url
  });
  console.log("The new product is: " + addItem)
  res.json(addItem);
})


module.exports = router;
