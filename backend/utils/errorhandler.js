class ErrorHandler{
    constructor(message,statusCode){
        this.message=message;
        this.statusCode=statusCode || 500;
        this.status= `${statusCode}`.startsWith('4')?'fail':'error';
        this.isOperational= true;

        console.error(`Error: ${message}, Status Code: ${statusCode}`);
    }
}

module.exports=ErrorHandler;