const notfound =(req,res,next) => {
    const error = new Error(`NOT fond -${req.originaLUrl}`);
    res.status(404);
    next(error);
};
const errorHanlder =(err,req,res,next) =>{
    const statusCode = res.statusCode ===200 ? 500 :res.statusCode;
    res.status(statusCode).json({message : err.message});
};
module.exports ={
    notfound,
    errorHanlder
}