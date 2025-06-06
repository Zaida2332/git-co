const express = require("express");
const { Types: { ObjectId } } = require("mongoose");
const router =express.Router();
const jwt = require("jsonwebtoken");
const {User,validateRegisterUser,validateLoginUser} = require("./models/User");
const bcrypt =require("bcryptjs");
/**
 * 
 * @desc register New User
 * @rout /api/register
 * @method POST  
 * @access public
 * 
  */ 
router.post("/register",async(req,res)=>{

    const {error} =validateRegisterUser(req.body);

    if(error){
        return res.status(400).json({ error });
    }

let user = await User.findOne({email:req.body.email});

if (user){

    return res.status(400).json({message:"this user already registered"});
}

const salt =await bcrypt.genSalt(0);
req.body.password =await bcrypt.hash(req.body.password,salt);

user =new User({

    email:req.body.email,
    username:req.body.username,
    password:req.body.password,
    isAdmin:req.body.isAdmin,
})

const result = await user.save();
const token = jwt.sign({ id:user._id, isAdmin: user.isAdmin },process.env.JWT_SECRET_KEY);
const {password, ...other} = result._doc;

res.status(202).json({...other,token});
});
/**
 * 
 * @desc login User
 * @rout /api/auth/login
 * @method POST  
 * @access public
 * 
  */ 
router.post("/login",async(req,res)=>{
    
    const {error} = validateLoginUser(req.body);

    if(error){
        return res.status(400).json({ error });
    }

let user = await User.findOne({email:req.body.email});

if (!user){

    return res.status(400).json({message:"nvalid email or password"});
}

const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
if (!isPasswordMatch){

    return res.status(400).json({message:"nvalid email or password"});
}

const token = jwt.sign({ id:user._id, isAdmin: user.isAdmin },process.env.JWT_SECRET_KEY/*,{
    expiresIn:"4d"
}*/);

const {password, ...other} = user._doc;


res.status(200).json({...other,token});

});

module.exports = router;