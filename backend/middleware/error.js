const ErrorHandler= require("../utils/errorhandler");
const mysql= require('mysql2');

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";

   // Check for specific MySQL error codes and customize the response
   if(err && err.code === 'ER_DUP_ENTRY') {
     // If it's a MySQL duplicate entry error
     const duplicateKeys = Object.keys(err.values).join(', ');
     const message = `Duplicate entry for ${duplicateKeys} entered`;
     // Creating a new instance of an error handler with a 400 status code
     err = new ErrorHandler(message, 400);
   }  
   
   //wrong JWT error
   if(err && err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid. Please try again.`;
    err=new ErrorHandler(message,400);
   }

    // JWT EXPIRE error
    if (err && err.name === "TokenExpiredError") {
        const message = `Json Web Token has expired. Please try again.`;
        err = new ErrorHandler(message, 400);
      }
    console.log("hellooooooooooooooooooooo");
      res.status(err.statusCode).json({
        success: false,
        message: err.message,
      });
}

