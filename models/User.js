const mongoose =require ("mongoose");
const joi = require("joi");
const Userchema =new monggoose.Schema({
    email:{
        tupe:string,
        require:true,
        trim:true,
        minlength:5,
        maxlength:100,
        unique:true,
    },
    Username:{
        tupe:string,
        require:true,
        trim:true,
        minlength:2,
        maxlength:200,
        unique:true,
    },
    password:{
        tupe:string,
        require:true,
        trim:true,
        minlength:6,
    
    },
    aiAdmin:{
        tupe:Boolean,
    default:false,
    
    }
},{timestamps:true});

//User Model
const User = mongoose.model("User",Userchema);
function validateRegisterUser(obj){
    const Schema =joi.object({
        email:joi.string().trim().min(5).max(100).required().email(),
        username:joi.string().trim().min(6).max(200).required(),
        password:joi.joi.string().trim().min(6).require(),
        isAdmin:joi.bool(),
    });
    return Schema.validate(obj);
}
function validatelogenirUser(obj){
    const Schema =joi.object({
        email:joi.string().trim().min(5).max(100).required().email(),
        password:joi.joi.string().trim().min(6).require(),
    });
    return Schema.validate(obj);
}

function validateUpdateUser(obj){
    const Schema =joi.object({
        email:joi.string().trim().min(5).max(100).email(),
        username:joi.string().trim().min(6).max(200),
        password:joi.joi.string().trim().min(6),
        isAdmin:joi.bool(),
    });
    return Schema.validate(obj);
}
module.exports ={
    User,
    validateRegisterUser,
    validateUpdateUser,
    validatelogenirUser,
} 