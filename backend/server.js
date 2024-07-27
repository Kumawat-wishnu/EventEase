const app=require("./app");
const connection=require("./db/connection");
const authRoutes=require('./routes/authRoutes');
const errorHandlerMiddleware = require('./middleware/error'); 
const eventRoutes=require('./routes/eventRoutes');
const paymentRoutes=require('./routes/paymentRoutes');
const eventController=require('./Controllers/eventController');
const userRoutes= require('./routes/userRoute');

app.use('/authentication',authRoutes);
app.use('/event',eventRoutes);
app.use('/payment',paymentRoutes);
app.use('/user',userRoutes);

app.use(errorHandlerMiddleware);
//for deleting the images from uploads folder if exists
eventController.cleanUpUploads();


app.get("/",(req,res)=>{
    res.send("hello dear");
});

const port =3009;
app.listen(port,()=>{console.log(`server is running on port ${port}`)});