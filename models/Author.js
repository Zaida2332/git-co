const { string, required } = require("joi");
const mongoose =require("mongoose");
const joi =require("joi");
const authorSchem =new mongoose.Schema({
firstName:{
    type:String,
    required:true,
    trim:true,
    minlength:3,
    maxlength:200,
},
lastName:{
    type:String,
    required:true,
    trim:true,
    minlength:3,
    maxlength:200,
},
nationality:{
    type:String,
    required:true,
    trim:true,
    minlength:3,
    maxlength:100,
},
image:{
    type:String,
    default:"default-avatar.png "
},




},{
    timestamps:true
}

);
const author =mongoose.model("Author",authorSchem);


function validateCreateAuthor(obj){

    const shcema=joi.object({
        firstName:joi.string().trim().min(3).max(200),
        lastName:joi.string().trim().min(3).max(200),
        nationality:joi.string().trim().min(2).max(100),
        image:joi.string(),
    });

    return shcema.validate(obj);
}

function validateUpdateAuthor(obj){

    const shcema=joi.object({
        firstName:joi.string().trim().min(3).max(200),
        lastName:joi.string().trim().min(3).max(200),
        nationality:joi.string().trim().min(2).max(100),
        image:joi.string(),
    });

    return shcema.validate(obj);
}

function findByIdAndDelete(obj){

    const shcema=joi.object({
        firstName:joi.string().trim().min(3).max(200),
        lastName:joi.string().trim().min(3).max(200),
        nationality:joi.string().trim().max(500),
        image:joi.string(),
    });

    return shcema.validate(obj);
}
module.exports ={
    author,
    validateCreateAuthor,
    validateUpdateAuthor
}