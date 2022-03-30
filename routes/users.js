var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const { User, Comments, Quiz, Product, Skintype } = require("../models");
const jwt = require("jsonwebtoken");
const isValidToken = require("../middleware/isValidToken");
require("dotenv").config();
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR));
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
    skintype_id: 0,
  });
  res.redirect(`/profile/${newUser.id}`);
});

router.post("/login", async (req, res, next) => {
  let { username, password } = req.body;
  globalUsername = username;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  //console.log("user js line 41",user)
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
    
      res.send("wrong password!");
    }
  } else {
    res.send("sorry, no user found");
  }
});

router.post("/quiz", isValidToken, async function (req, res, next) {
  const { q1, q2, q3 } = req.body;
  console.log(req.body);

  quizResult = Number(q1) + Number(q2) + Number(q3);

  const user = await User.findOne({
    where: {
      username: globalUsername,
    },
  });

  let skinTypeID = "";

  if (quizResult / 3 <= 3) {
    user.update({ skintype_id: 1 });
    skinTypeID = "dry";
  } else if (quizResult / 3 <= 5) {
    user.update({ skintype_id: 2 });
    skinTypeID = "normal";
  } else {
    user.update({ skintype_id: 3 });
    skinTypeID = "oily";
  }

  console.log(skinTypeID);

  const dataReturn = await Product.findAll({
    where: { skintype_id: user.skintype_id },
  });

  // console.log(dataReturn);
  res.render("skin-results", { products: dataReturn, skinType: skinTypeID });
});

router.post("/comment", async (req, res, next) => {
  let { name, title } = req.body;
  console.log(name, title);

  const newComment = await Comments.create({
    name,
    title,
  });
  res.redirect("/comment");
 
});

// update a user   WORKING
router.post("/update", async (req, res) => {
  const {name, username, email, password} = req.body
  const id = Number(req.body.id) 
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  console.log(req.body.id, "user line 137")
  const user = await User.update(
    {
      name: name,
      username: username, 
      password: hashedPassword,
      email: email,
    },
    {
      where: {
        id: id
      },
    }
  );

    res.redirect(`/userprofile/${req.body.id}`)
});

module.exports = router;
