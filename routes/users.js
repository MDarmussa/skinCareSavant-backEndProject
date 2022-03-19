var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const { User, Comments, Quiz, Product, Skintype } = require("../models");
const jwt = require("jsonwebtoken");
const isValidToken = require("../middleware/isValidToken");
require("dotenv").config();
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
const { Op } = require("@sequelize/core");
// const axios = require('axios');
// const { route } = require('express/lib/application'); //??
// const res = require('express/lib/response'); //??
let globalUsername;
/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send('respond with a resource');
});

/* POST users Register. */
router.post("/register", async (req, res, next) => {
  let { name, username, password, email, skintype_id } = req.body;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  console.log(username, password);
  globalUsername = username;
  const newUser = await User.create({
    name,
    email,
    username,
    password: hashedPassword,
    skintype_id: 0, //set to 0 initially so user can upate it later; proposal to make new column
  });
  res.redirect(`/profile/${newUser.id}`);

  // res.render("/login");
});

//shayma -post user login
router.post("/login", async (req, res, next) => {
  let { username, password } = req.body;
  globalUsername = username;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  if (user) {
    const comparePass = bcrypt.compareSync(password, user.password);
    if (comparePass === true) {
      const token = jwt.sign(
        {
          data: user.username,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.cookie("token", token);
      res.redirect(`/profile/${user.id}`);
    } else {
      res.send("wrong pass");
    }
  } else {
    res.send("sorry, no user found");
  }
  // res.redirect('profile')
});

/* GET Profile */
// router.get('/quiz', async (req, res) => {
//   const {q1, q2, q3} = req.body;
//   const quizData = await Quiz.create({
//     question1: q1,
//     question2: q2,
//     question3: q3
//   })
//   const quizResult = await (q1+q2+q3);
//   switch (quizResult) {
//     case `((quizResult / 3)) < 3)`:
//       res.send(`/profile/ You have a dry skin `);
//       break;
//     case `((quizResult / 3)) < 7)`:
//       res.send(`/profile/ You have a normal skin `)
//       break;
//     default:
//       res.send(`/profile/ You have a Oily skin `)
//   }
// })

router.post("/quiz", isValidToken, async function (req, res, next) {
  //take user POST submission and generate the math logic in the GET request on the backend
  const { q1, q2, q3 } = req.body;
  console.log(req.body);

  quizResult = Number(q1) + Number(q2) + Number(q3);
  console.log(q1, q2, q3);
  //quiz logic start
  // let dataReturn;
  const user = await User.findOne({
    where: {
      username: globalUsername,
    },
  });

  if (quizResult / 3 <= 3) {
    user.update({ skintype_id: 1 });
    // dataReturn = await Product.findAll({ where: { skintype_id: user.skintype_id } } ); 
    //pulling the user id from skinstpe i; the user is already logged in 
    
    //returns a value-- const something = model.findall
    // res.send("You have dry skin"); //send two arguments; one is thr route
    // res.render('skin-results', {products: dataReturn})// pass in whatever data to the template
  } else if (quizResult / 3 <= 5) {
    // dataReturn = await Product.findAll(id >= 8); //returns a value-- const something = model.findall
    user.update({ skintype_id: 2 });

    // dataReturn = await Product.findAll({ where: { skintype_id: user.skintype_id } } ); 
    // dataReturn = await Product.findAll({
   
    //   where: { id: { [Op.between]: [5, 7] } },
    // }); //returns a value-- const something = model.findall
    // // res.send(`/profile/ You have normal skin `);
  } else {
    user.update({ skintype_id: 3 });


    // dataReturn = await Product.findAll({ where: { id: { [Op.gte]: 8 } } }); //returns a value-- const something = model.findall
    // // dataReturn = await Product.findAll(id >= 8); //returns a value-- const something = model.findall
    // // res.send(`/profile/ You have oily skin the result is ${quizResult}`);
  }

  const dataReturn = await Product.findAll({ where: { skintype_id: user.skintype_id } } ); 

  console.log(dataReturn);
  // Res.render(‘myTemplate’, { skin: value, hair: value})

  // res.send("these are the quiz results");
  res.render("skin-results", { products: dataReturn }); // pass in whatever data to the template
  // Res.render(‘myTemplate’, { skin: value , {dry, oily, normal})
  // OBJECT (data that we have made to post int he templating gengine
});

//03/19 -- removed the GET route

// router.get("/quiz", isValidToken, async (req, res, next) => {
// this is after the user submits their quiz on the profile route
//add logic to do math (if statement)
//EJS -- res.render the string as my tempalte name, OBJECT (data that we have made to post int he termplatin gengine )

// res.render-- information obtainded from DOM in the post request; GET by value is coming from the POST request ; RES RENDER

// res.send('this is the quiz route ')

// });

// router.get("/quiz", isValidToken, async (req, res, next) => {

//   const { q1, q2, q3 } = req.body;

//   //add logic to do math (if statement)

//   const oilySkin = parseInt(document.getElementsByClassName("oily").value);
//   const normalSkin = parseInt(document.getElementsByClassName("normal").value);
//   const drySkin = parseInt(document.getElementsByClassName("dry").value);

//   let quizResult = (oilySkin + normalSkin + drySkin) / 3;
//   if (quizResult <= 3) {
//     res.send(`/profile/ You have dry skin `);
//   } else if (quizResult <= 5) {
//     res.send(`/profile/ You have normal skin `);
//   } else {
//     res.send(
//       `/profile/ You have oily skin ${oneQuestion} ${twoQuestion} ${threeQuestion} the result is ${quizResult}`
//     );
//   }

// if ((quizResult /  3)<=3 ) {
//   res.send(`/profile/ You have dry skin `)
// } else if((quizResult /  3) <= 5) {
//   res.send(`/profile/ You have normal skin `)

// } else {
//   res.send(`/profile/ You have oily skin ${quizResult}`)
// }
// res.json(quizData);
// });

// Post the API into our db //cancel
// router.get('/product/:id', async function(req, res, next) {
//   const { id } = req.params

//   //get from product table based on skin_id

//   var config = {
//     method: 'get',
//     url: `https://skincare-api.herokuapp.com/products/${id}`,
//     headers: { },
//   };

//   //render(GET) products from product table to the profile page, ...
//then update the user profile with recommended products based on the skin type using skinType_id FK (note)
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

// shayma post the user comment
router.post("/comment", async (req, res, next) => {
  let { name, title } = req.body;
  console.log(name, title);

  const newComment = await Comments.create({
    name,
    title,
  });
  res.json({
    name: newComment.name,
    title: newComment.title,
  });
});

//POST Product to SQL Table //admin use only for posting
// router.post('/products', async (req, res) => {
//   const { brand, productName, ingredients, url } = req.body;
//   const addItem = await Product.create({
//     brand: brand,
//     productName:productName,
//     ingredients: ingredients,
//     url:url
//   });
//   console.log("The new product is: " + addItem)
//   res.json(addItem);
// })

//Get product
router.get("/products", async function (req, res, next) {
  const { brand, productName, ingredients, url } = req.body;
  const addItem = await Product.findAll({
    brand: brand,
    productName: productName,
    ingredients: ingredients,
    url: url,
  });
  res.redirect("/profile");
});

module.exports = router;
