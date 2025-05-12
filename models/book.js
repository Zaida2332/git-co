
const mongoose =require ("mongoose");
const joi = require("joi");
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
function validateCreateBook(obj){

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
})


}

module.exports ={
    book,
    validateCreateBook,
    validateUpdateBook,
}