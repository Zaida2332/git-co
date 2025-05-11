
const express =require("express");
const router =express.Router();

const joi =require('joi');

const books = [

/**
 * 
 * @desc get all books
 * @rout /api/books
 * @method GET
 * @access public
 * 
  */ 
    {


        id:5,
        title:"ljkn",
        description:"kjnlknln",
        price :10,
        cover:"soft cover"
    
    
    },

{


    id:1,
    title:"nasim taleb",
    description:"about blak swan",
    price :10,
    cover:"soft cover"


},


{


    id:2,
    title:"nasim taleb",
    description:"about blak swan",
    price :12,
    cover:"soft cover"


},


]
router.get ("/",(req,res)=> {
    res.status(200).json(books);

});


router.get("/:id",(req,res) => {

    const book = books.find(b =>b.id === parseInt( req.params.id) ); 
if(book){
    res.status(200).json(book);
} else {
    res.status(404).json({message:"book not fond"});
}
});

router.post("/",(req,res) => {
    const {error}=validateCreateBook(req.body);
    
    if(error){

return res.status(400).json({message: error.details[0].message});
    }




    const book = {
    id:books.length +1,
    title :req.body.title,
    author :req.body.author,
    description: req.body.description,
    price:req.body.price,
    cover:req.body.cover

    }

    books.push(book)
    res.status(201).json(books);

});


/**
 * 
 * @desc update a books 
 * @rout /api/books/:id
 * @method PUt
 * @access public
 *
  */  

router.put("/:id",(req,res) => {
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

router.delete("/:id",(req,res) => {
    const book =books.find(b => b.id === parseInt(req.params.id));
    if(book){
        res.status(200).json({message:"books has been delete"});

    }else{
        res.status(404).json({message:"book not found"});
    }

});


function validateCreateBook(obj){

    const shcema=joi.object({
        title:joi.string().trim().min(3).max(200).required(),
        author:joi.string().trim().min(3).max(200).required(),
        description:joi.string().trim().max(500).required(),
        price:joi.number().min(0).required(),
        cover:joi.string().trim().required(),
    });


return shcema.validate(obj);
}

module.exports =router;