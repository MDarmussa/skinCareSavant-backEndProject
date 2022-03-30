const express = require("express");
const router = express.Router();
const { User, Comments, Quiz, Product, Skintype } = require("../models");
const isValidToken = require("../middleware/isValidToken");
require("dotenv").config();
const Sequelize = require("sequelize");
const skintype = require("../models/skintype");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express" });
});

router.get("/logout", function (req, res, next) {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/login");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

// comments route
router.get("/comment", async function (req, res, next) {
  const findallcomment = await Comments.findAll();
  console.log(findallcomment);
  res.render("comment", { findallcomment: findallcomment });
});

// delete route 

router.get("/comment/:id", function (req, res, next) {
  res.render("/comment/:id");
});


//profile route -auth is work- middleware
router.get("/profile/:id", async function (req, res, next) {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  console.log(user);
  res.render("profile", { name: user.username, id: id });
   
});

router.get("skintype/:id", isValidToken, async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  const products = await product.findAll({});

  res.render("profile", { user: user, id: id });
});

router.get("/userprofile/:id", isValidToken, async function (req, res, next) {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id: id,
    },
  });
  console.log(user);
  res.render("userprofile", { id: id , name: user.name, username: user.username, email: user.email});
});

module.exports = router;
