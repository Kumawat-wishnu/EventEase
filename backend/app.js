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



app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

module.exports=app;
