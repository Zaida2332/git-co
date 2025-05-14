const mongoose =require ("mongoose");
//const joi = require("joi");
const Userchema =new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:200,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:6,
    
    },
    isAdmin:{
        type:Boolean,
    default:false,
    
    }
},{timestamps:true});

//User Model
const User = mongoose.model("User",Userchema);
function validateRegisterUser(obj){
  //  unction validateRegisterUser(obj) {
    const errors = {};

    if (!obj.email || typeof obj.email !== 'string' || obj.email.trim().length < 5 || obj.email.trim().length > 100 || !obj.email.includes('@')) {
        errors.email = "Email must be a valid string between 5 and 100 characters and contain '@'.";
    }

    if (!obj.username || typeof obj.username !== 'string' || obj.username.trim().length < 6 || obj.username.trim().length > 200) {
        errors.username = "Username must be a string between 6 and 200 characters.";
    }

    if (!obj.password || typeof obj.password !== 'string' || obj.password.trim().length < 6) {
        errors.password = "Password must be at least 6 characters long.";
    }

    if ('isAdmin' in obj && typeof obj.isAdmin !== 'boolean') {
        errors.isAdmin = "isAdmin must be a boolean value.";
    }

    return {
        error: Object.keys(errors).length > 0 ? errors : null,
        value: obj
    };
}function validateLoginUser(obj) {
    const errors = {};
    if (!obj.email || typeof obj.email !== 'string' || obj.email.trim().length < 5 || obj.email.trim().length > 100 || !obj.email.includes('@')) {
        errors.email = "Email must be a valid string between 5 and 100 characters and contain '@'.";
    }

    if (!obj.password || typeof obj.password !== 'string' || obj.password.trim().length < 6) {
        errors.password = "Password must be at least 6 characters long.";
    }

    return {
        error: Object.keys(errors).length > 0 ? errors : null,
        value: obj
    };
}function validateUpdateUser(obj) {
    const errors = {};

    if ('email' in obj) {
        if (typeof obj.email !== 'string' || obj.email.trim().length < 5 || obj.email.trim().length > 100 || !obj.email.includes('@')) {
            errors.email = "Email must be a valid string between 5 and 100 characters and contain '@'.";
        }
    }

    if ('username' in obj) {
        if (typeof obj.username !== 'string' || obj.username.trim().length < 6 || obj.username.trim().length > 200) {
            errors.username = "Username must be a string between 6 and 200 characters.";
        }
    }

    if ('password' in obj) {
        if (typeof obj.password !== 'string' || obj.password.trim().length < 6) {
            errors.password = "Password must be at least 6 characters long.";
        }
    }

    if ('isAdmin' in obj && typeof obj.isAdmin !== 'boolean') {
        errors.isAdmin = "isAdmin must be a boolean value.";
    }

    return {
        error: Object.keys(errors).length > 0 ? errors : null,
        value: obj
    };
}
/* const Schema =joi.object({
        email:joi.string().trim().min(5).max(100).required().email(),
        username:joi.string().trim().min(6).max(200).required(),
        password:joi.string().trim().min(6).required(),
        isAdmin:joi.bool(),
    });
    return Schema.validate(obj);
}
function validatelogenirUser(obj){
    const Schema =joi.object({
        email:joi.string().trim().min(5).max(100).required().email(),
        password:joi.string().trim().min(6).required(),
    });
    return Schema.validate(obj);
}

function validateUpdateUser(obj){
    const Schema =joi.object({
        email:joi.string().trim().min(5).max(100).email(),
        username:joi.string().trim().min(6).max(200),
        password:joi.string().trim().min(6),
        isAdmin:joi.bool(),
    });
    return Schema.validate(obj);
}*/
module.exports ={
    User,
    validateRegisterUser,
    validateUpdateUser,
    validateLoginUser,
} 