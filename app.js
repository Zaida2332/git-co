const express = require("express");

const bookspath =require("./books");

const authorspath =require ("./authors");
const mongoose=require("mongoose");
const logger =require("./middlewares/logger");
const dotenv =require("dotenv");
dotenv.config();

const joi =require('joi');

const app=express();
app.use(logger);

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("connected to mongoDB..."))
.catch((error) =>console.log("connection failed to mongoDB",error))

//const app=express();
app.use(express.json());

app.use("/api/books",bookspath);
app.use("/api/authors",authorspath);




const PORT= process.env.PORT || 9999;
app.listen (PORT, () => console.log(`server is running in ${process.env.NODE_ENV}mod on port ${PORT}`));
/*app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

});*/
