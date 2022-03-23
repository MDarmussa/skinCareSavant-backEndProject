const express = require('express');
const router = express.Router();
const { User, Comments, Quiz, Product, Skintype } = require('../models');
const isValidToken = require('../middleware/isValidToken')
require('dotenv').config();
const Sequelize = require('sequelize');
const skintype = require('../models/skintype');




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

//shayma - login route
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/logout', function(req, res, next) {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/');
});

router.get('/reset-password', function(req,res,next){
  res.render('reset-password')
})



// comments route
router.get('/comment',  function(req, res, next) {
  res.render('comment');
});


// router.get('/comment/:id', isValidToken, async function(req, res, next) {
//   const {id} = req.params;
//   const comments = await Comments.findOne({
//     where:{
//       id:id,
//     }
//   });
//   res.render('comment', { title: comments.title });
// });



//shayma - profile route -auth is work- middleware
router.get('/profile/:id', async function(req, res, next) {
  const {id} = req.params;
  const user = await User.findOne({
    where:{
      id:id
    }
  });
  console.log(user)
  // const product = await Product.findAll({
  //   where:{
  //     skintype_id:user.skintype_id
  //   }
  // });
  // console.log(product)
  res.render('profile', { name: user.username });
});






router.get('skintype/:id', isValidToken, async (req, res, next) => { // found in the users table 
  const {id} = req.params;
  const user = await User.findOne({
    where: {
      id:id
    },
  })
  const products = await product.findAll({
    
  })
  res.render('profile', {user:user})
})

// router.get('/quiz/:id', isValidToken, async (req, res, next) => {//this is related to the unused quiz id this is no longer needed 
//   const user = await User.findOne({
//     where:{
//       id: id
//     },
//   })
//   res.render('profile', {user: user})
// })




module.exports = router;
