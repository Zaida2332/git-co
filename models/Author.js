const { string, required } = require("joi");
const mongoose =require("mongoose");
/*const joi =require("joi");*/
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
function validateCreateAuthor(obj) {
    const errors = {};

    if ('firstName' in obj) {
        if (typeof obj.firstName !== 'string' || obj.firstName.trim().length < 3 || obj.firstName.trim().length > 200) {
            errors.firstName = "First name must be a string between 3 and 200 characters.";
        }
    }

    if ('lastName' in obj) {
        if (typeof obj.lastName !== 'string' || obj.lastName.trim().length < 3 || obj.lastName.trim().length > 200) {
            errors.lastName = "Last name must be a string between 3 and 200 characters.";
        }
    }

    if ('nationality' in obj) {
        if (typeof obj.nationality !== 'string' || obj.nationality.trim().length < 2 || obj.nationality.trim().length > 100) {
            errors.nationality = "Nationality must be a string between 2 and 100 characters.";
        }
    }

    if ('image' in obj && typeof obj.image !== 'string') {
        errors.image = "Image must be a string.";
    }

    return {
        error: Object.keys(errors).length > 0 ? errors : null,
        value: obj
    };
}
function validateUpdateAuthor(obj) {
    const errors = {};

    if ('firstName' in obj) {
        if (typeof obj.firstName !== 'string' || obj.firstName.trim().length < 3 || obj.firstName.trim().length > 200) {
            errors.firstName = "First name must be a string between 3 and 200 characters.";
        }
    }

    if ('lastName' in obj) {
        if (typeof obj.lastName !== 'string' || obj.lastName.trim().length < 3 || obj.lastName.trim().length > 200) {
            errors.lastName = "Last name must be a string between 3 and 200 characters.";
        }
    }

    if ('nationality' in obj) {
        if (typeof obj.nationality !== 'string' || obj.nationality.trim().length < 2 || obj.nationality.trim().length > 100) {
            errors.nationality = "Nationality must be a string between 2 and 100 characters.";
        }
    }

    if ('image' in obj && typeof obj.image !== 'string') {
        errors.image = "Image must be a string.";
    }

    return {
        error: Object.keys(errors).length > 0 ? errors : null,
        value: obj
    };
}
function findByIdAndDelete(obj) {
    const errors = {};

    if ('firstName' in obj) {
        if (typeof obj.firstName !== 'string' || obj.firstName.trim().length < 3 || obj.firstName.trim().length > 200) {
            errors.firstName = "First name must be a string between 3 and 200 characters.";
        }
    }

    if ('lastName' in obj) {
        if (typeof obj.lastName !== 'string' || obj.lastName.trim().length < 3 || obj.lastName.trim().length > 200) {
            errors.lastName = "Last name must be a string between 3 and 200 characters.";
        }
    }

    if ('nationality' in obj) {
        if (typeof obj.nationality !== 'string' || obj.nationality.trim().length > 500) {
            errors.nationality = "Nationality must be a string with a maximum of 500 characters.";
        }
    }

    if ('image' in obj && typeof obj.image !== 'string') {
        errors.image = "Image must be a string.";
    }

    return {
        error: Object.keys(errors).length > 0 ? errors : null,
        value: obj
    };
};

/*
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
        
    });*/

    // return shcema.validate(obj);
/*}*/
module.exports ={
    author,
    validateCreateAuthor,
    validateUpdateAuthor
}