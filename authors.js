const express = require("express");
const { Types: { ObjectId } } = require("mongoose");
const router =express.Router();
const asyncHandler =require("express-async-handler"); /////////
const { author ,validateCreateAuthor,validateUpdateAuthor} =require("./models/Author");
const authors =[
    {

    id : 1,
    firstname :"taleb",
    lastname :"fge",
    nationality :"lebnnan",
    image:"default-image-png",

},
];

/**
 * 
 * @desc get all books
 * @rout /api/authors
 * @method GET  
 * @access public
 * 
  */ 



router.get ("/", asyncHandler (//////
    async( req, res) => {
        try{

    const authorlist = await author.find();
    res.status(200).json(authorlist);

        } catch (error) {
            console.log(error);
            res.status(500).json({  message:  "something went wrong"});
        }
    }
));


router.get("/:id",async(req,res) => {

    try{
        const id = new ObjectId(req.params.id);
        const authorlist = await author.findById({ _id: id });
        res.status(200).json(authorlist);
    }catch(error){
        console.log(error);
        res.status(500).json({message:"somthing went wrong"});
    }
    });
    


router.post("/", async(req,res) => {
    const {error}=validateCreateAuthor(req.body);
    
    if(error){

return res.status(400).json({message: error.details[0].message});
    }




try {

    const newAuthor =new author({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        nationality:req.body.nationality,
        image:req.body.image,
        });
        const result =await newAuthor.save();
        res.status(201).json(result);
    
    
}
catch (error){
    console.log (error);
    res.status(500).json({message:"something went wrong"});
}
});


/**
 * 
 * @desc update a books 
 * @rout /api/books/:id
 * @method PUt
 * @access public
 *
  */  

router.put("/:id",async (req,res) => {
    
    const {error} = validateUpdateAuthor(req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
const resultAuthor = await author.findByIdAndUpdate(req.params.id,{
        $set: {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            nationality:req.body.nationality,
            image:req.body.image,
    }
    },{new: true})
    res.status(200).json(resultAuthor);
    console.log(error);
    console.log(500).json({message:"something went wrong"});
    });
    
    /**
 * 
 * @desc Delete a books 
 * @rout /api/books/:id
 * @method Delete
 * @access public
 *
  */  

router.delete("/:id",async (req,res) => {

try {
    const id = new ObjectId(req.params.id);
    const deletedAuthor = await author.findById({ _id: id });
    
    if(deletedAuthor){

        await author.findByIdAndDelete(req.params.id);
    
    res.status(200).json({message:"author hsa brrn this.delete"});
} else {
    res.status(404).json({message:"something went wrong"});
}

    
} catch (error) {

        console.log (error);
        res.status(500).json({message:"something went wrong"});
    }
    });
    

module.exports =router;
