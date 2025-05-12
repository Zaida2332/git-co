
const express =require("express");
const router =express.Router();
const asyncHandler =require("express-async-handler");
const{validateCreateBook,validateCreateBookS,book}=require("./models/book");
const { author } = require("./models/Author");



/*
router.get("/:id",asyncHandler(async(req,res) => {
    const books = await book.find()
    res.status(200.json(books));
}));
*/
router.get("/:id",asyncHandler(async(req,res) => {

const book = await book .findbyid( req.params.id).populate("author"); 
if(book){
    res.status(200).json(book);
} else {
    res.status(404).json({message:"book not fond"});
}

}));

router.get("/",asyncHandler(async(req,res,next) => {

const books = await book.find().populate("author"["id.firstName.lstName" ]); 
if(book){
    res.status(200).json(books);
} else {
    res.status(404).json({message:"book not fond"});
}

}));


router.post("/",asyncHandler(async (req,res) => {

    const {error}=validateCreateBook(req.body);
    
    if(error){

return res.status(400).json({message: error.details[0].message});
    }

    const newBook = new book (
        {

        
    
    title :req.body.title,
    author :req.body.author,
    description: req.body.description,
    price:req.body.price,
    cover:req.body.cover
        }
    )
    const result =await newBook.save();
    res.status(201).json(result);

}));


/**
 * 
 * @desc update a books 
 * @rout /api/books/:id
 * @method PUt
 * @access public
 *
  */  

router.put("/:id",asyncHandler(async(req,res) => {
    const {error} = validateCreateBook(req.body);
    if(error){

        return res.status(400).json({message: error.details[0].message});
    }
const updatedBook =await Book.findbyidAndUpdate(req.params.id,{

    $set:{

    title :req.body.title,
    author :req.body.author,
    description: req.body.description,
    price:req.body.price,
    cover:req.body.cover


    }
},{new:true});
res.status(200).json(updatedBook);

}));
router.post("/:id",(req,res) => {
    const {error} = validateCreateBook(req.body);
    if(error){

        return res.status(400).json({message: error.details[0].message});
    }
    const book =books.find(b => b.id === parseInt(req.params.id));
    if(book){
        res.status(200).json({message:"books has been updated"});

    }else{
        res.status(404).json({message:"book not found"});
    }

});

/**
 * 
 * @desc Delete a books 
 * @rout /api/books/:id
 * @method Delete
 * @access public
 *
  */  

router.delete("/:id",asyncHandler(async(req,res) => {
    const book =await Book.findbyid(req.params.id);
    if(book){
        await Book.findbyidAndDelete(req.params.id);
        res.status(200).json({message:"books has been delete"});

    }else{
        res.status(404).json({message:"book not found"});
    }

}));



module.exports =router;