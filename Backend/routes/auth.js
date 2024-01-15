const express = require('express') //import express
const User =require('../models/User'); //here i imort User module
const router = express.Router()  //import routers
const { body, validationResult } = require('express-validator'); // this is import used for validation
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')  // .. is used for we go one step previous

const JWT_SECRET = 'shaileshisgood$boy';


// Route 1 :: create a user using : POST "/api/auth/createuser" this endpoint   , hit the request on this endpoint  , and it does not requred authenticaiton
router.post('/createuser',[
    body('name').isLength({min: 3}),  // the length of name greaer then 3 character
   body('email').isEmail(),          // email must be isEmail if not we get error 
   body('password').isLength({min: 5}),  // the lenght of password length is 5
], async (req,res)=>{  // here if you used get then requst go thrugh URL due to may be your password visible due to used post
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {                  // this is used to check is any one of the component is empty the we get an error 400
      return res.status(400).json({ errors: errors.array() });
    }
    // this below code is used to check if email is exist alredy or not
    // this below try and catch used for storing valid data to db;
    try{

      let user = await User.findOne({email: req.body.email});
      console.log(user)
      if(user){
        return res.status(400).json({error: "Sorry a user with this email is alredy exist"})
      }
      const salt = await bcrypt.genSalt(10); // here i create salt using bcrytp js which is the nodejs pacakage
      const secPass = await bcrypt.hash(req.body.password,salt);  // await is used to create promise
       user = await User.create({                           // here i create a user which contain name,,email,and password 
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });
        const data = {
        user:{
          id:user.id
        }
      }
        const authtoken = jwt.sign(data , JWT_SECRET);
        

        res.json({authtoken})
    }
    // used to catch the error
    catch (error){
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
})


// Route 2::  Authenticate user using : POST "/api/auth/login" , no login required  ,, in this route we can enter the correct email and password


router.post('/login',[
 body('email','Enter a valid email').isEmail(),          // email must be isEmail if not we get error 
 body('password','Password cannot be blank').exists()
], async (req,res)=>{

  const errors = validationResult(req);
  if (!errors.isEmpty()) {                  // this is used to check is any one of the component is empty the we get an error 400
    return res.status(400).json({ errors: errors.array() });
  }

  const {email , password} = req.body;

  try{
    let user = await User.findOne({email});  // this function is used to find the email which entered
    if(!user)
    {
      return res.status(400).json({error:"Please try to login with correct Credentials"});  // if user does not exists eith entered password then we get this error
    }

    const passwordCompare = await bcrypt.compare(password , user.password); // this is used to compare the password enter by user and the password present in db

    if(!passwordCompare)
    {
      return res.status(400).json({error:"Please try to login with correct Credentials"});   // if password is not matched the we got this error
    }

    const data = {
      user:{
        id:user.id
      }
    }
      const authtoken = jwt.sign(data , JWT_SECRET);
      res.json({authtoken})
  } catch (error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// Route 3::  Get loggedin user details using : POST "/api/auth/getuser" , login required // withot login we cannot get used details


router.post('/getuser',fetchuser, async (req,res)=>{
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
  
} catch (error) {
  console.log(error.message);
  res.status(500).send("Internal Server Error");
}
 })
module.exports=router    //here i export the router