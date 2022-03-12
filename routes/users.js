var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config()
const saltRounds = bcrypt.genSaltSync(Number(process.env.SALT_FACTOR))
const {User} = require('../models'); 
const jwt = require('jsonwebtoken');




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/login', async (req, res, next) => {
  const {username, password} = req.body

  const user = await User.findOne({  // to find a user
   where:{
     username: username
   }
  }); 
  if (user){
    //takes our user input password from req.body , users bcrypt to hash it and checks that hash is the same as the already hashed password in our DB 
   const comparePass = bcrypt.compareSync(password, user.password) //check the password 
   if(comparePass === true) {
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
     res.send('sorry wrong password')
   }


  } else {
    res.send("sorry, no user found");
  }
  });       




module.exports = router;
