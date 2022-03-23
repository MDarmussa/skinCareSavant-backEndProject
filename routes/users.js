var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const { User, Comments, Quiz, Product, Skintype } = require("../models");
const jwt = require("jsonwebtoken");
const isValidToken = require("../middleware/isValidToken");
require("dotenv").config();
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
// const { Op } = require("@sequelize/core");
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
      // res.send("wrong pass");
      res.redirect("/reset-password"); //added by Rashida on 03-21-22
    }
  } else {
    res.send("sorry, no user found");
  }
});



router.post("/quiz", isValidToken, async function (req, res, next) {
  //take user POST submission and generate the math logic in the GET request on the backend
  const { q1, q2, q3 } = req.body;
  console.log(req.body);

  quizResult = Number(q1) + Number(q2) + Number(q3);

  const user = await User.findOne({
    where: {
      username: globalUsername,
    },
  });

  if (quizResult / 3 <= 3) {
    let skinType="Dry";
    user.update({ skintype_id: 1 });
  } else if (quizResult / 3 <= 5) {
    let skinType="Normal";
    user.update({ skintype_id: 2 });
  } else {
    let skinType="Oily";
    user.update({ skintype_id: 3 });
  }

  const dataReturn = await Product.findAll({
    where: { skintype_id: user.skintype_id },
  });

  console.log(dataReturn);
  res.render("skin-results", { products: dataReturn }); // pass in whatever data to the template
  // Res.render(‘myTemplate’, { skin: value , {dry, oily, normal})
  // OBJECT (data that we have made to post int he templating gengine
});

// shayma post the user comment

router.post("/comment", async (req, res, next) => {
  let { name, title } = req.body;
  console.log(name, title);

  const newComment = await Comments.create({
    name,
    title,
  });
  res.render('comment',{
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



// router.delete('/comment/:id', async (req, res) => {
//   const { id } = req.params;
//   const deletedUser = await Comments.destroy({
//       where: {
//           id
//       }
//   });
//   res.json(deletedUser);
// });



//POST Product to SQL Table

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

//trial 1 - updating username
router.post('/users',isValidToken, async (req, res) => {
  let { username } = req.body;
  const updatedUser = await User.update({
    where: {
      username: username
    }
  });
  console.log(updatedUser)
  res.json('line 174', updatedUser);
});

//trial 2 - updating username
router.patch("/users/:username", (req, res) => {
  console.log("PATCH /user/:id");
  const username = req.params.username;
  console.log(taskID);
  User.none(`UPDATE tasks SET is_completed = true WHERE username = ${userID};`) //where id = 4;
  res.json(`${username} has been updated`);//res.send(taskID);
});

module.exports = router;
