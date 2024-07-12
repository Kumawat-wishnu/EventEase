const express= require("express");
const app= express();
const bodyParser=require("body-parser");
const doenv= require("dotenv");
const cors= require("cors");
const cookieParser=require("cookie-parser");
doenv.config({
    path: "./.env",
});
const connection=require("./db/connection");


const corsOptions = {
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };

app.use(cors(corsOptions));
// app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

module.exports=app;
