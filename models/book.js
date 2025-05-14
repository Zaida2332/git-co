
const mongoose =require ("mongoose");
//const joi = require("joi");
const BookSchema =new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:250,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Author"
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:250
    },
    price: {
        type:Boolean,
        required:true,
        enum:["soft cover","hard cover"]
    }
},{timestamps:true});
const book = mongoose.model("book",BookSchema);
function validateCreateBook(obj) {
    const errors = {};

    if (!obj.title || typeof obj.title !== 'string' || obj.title.trim().length < 3 || obj.title.trim().length > 250) {
        errors.title = "Title must be a string between 3 and 250 characters.";
    }

    if (!obj.author || typeof obj.author !== 'string' || obj.author.trim().length === 0) {
        errors.author = "Author is required and must be a string.";
    }

    if (!obj.description || typeof obj.description !== 'string' || obj.description.trim().length > 500) {
        errors.description = "Description must be a string with a maximum of 500 characters.";
    }

    if (typeof obj.price !== 'number' || obj.price < 0) {
        errors.price = "Price must be a number greater than or equal to 0.";
    }

    if (!obj.cover || (obj.cover !== "soft cover" && obj.cover !== "hard cover")) {
        errors.cover = 'Cover must be either "soft cover" or "hard cover".';
    }

    return {
        error: Object.keys(errors).length > 0 ? errors : null,
        value: obj
    };
}
const validateUpdateBook = (obj) => {
    const errors = {};

    if (!obj.title || typeof obj.title !== 'string' || obj.title.trim().length < 3 || obj.title.trim().length > 200) {
        errors.title = "Title must be a string between 3 and 200 characters.";
    }

    if ('author' in obj && (typeof obj.author !== 'string' || obj.author.trim().length === 0)) {
        errors.author = "Author must be a non-empty string.";
    }

    if (!obj.description || typeof obj.description !== 'string') {
        errors.description = "Description is required and must be a string.";
    }

    if (typeof obj.price !== 'number' || obj.price < 0) {
        errors.price = "Price must be a number greater than or equal to 0.";
    }

    if (!obj.cover || typeof obj.cover !== 'string' || obj.cover.trim().length === 0) {
        errors.cover = "Cover is required and must be a non-empty string.";
    }

    return {
        error: Object.keys(errors).length > 0 ? errors : null,
        value: obj
    };
}
    /*

    const shcema=joi.object({
        title:joi.string().trim().min(3).max(250).required(),
        author:joi.string().required(),
        description:joi.string().trim().max(500).required(),
        price:joi.number().min(0).required(),
        cover:joi.string().valid("soft cover","hard cover").required(),

        

    });

return shcema.validate(obj);
}
function validateUpdateBook(obj){
const shcema=joi.object({
        title:joi.string().trim().min(3).max(200).required(),
        author:joi.string(),
        description:joi.string().required(),
        price:joi.number().min(0).required(),
        cover:joi.string().trim().required(),
})*/

module.exports ={
    book,
    validateCreateBook,
    validateUpdateBook,
}