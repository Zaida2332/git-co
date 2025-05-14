const express = require("express");
const { Types: { ObjectId } } = require("mongoose");
const router =express.Router();
const {User,validateRegisterUser,validatelogenirUser} = require("./models/User");
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
        return res.status(400).json({message:error.details[0].message});
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
const token = null;
const {password, ...other} = result._doc;

res.status(202).json({...other,token});
});
module.exports = router;