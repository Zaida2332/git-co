const express = require("express");

const bookspath =require("./books");
const authorspath =require ("./authors");
const mongoose=require("mongoose");

mongoose
.connect("mongodb://localhost/bookStoreDB")
.then(()=>console.log("connected to mongoDB..."))
.catch((error) =>console.log("connection failed to mongoDB",error))

const app=express();
app.use(express.json());

app.use("/api/books",bookspath);
app.use("/api/authors",authorspath);




const PORT= 9999;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

});
