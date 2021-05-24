const express= require("express");
const cookieParser= require('cookie-parser');
const path =require("path");
const hbs= require("hbs");
const app=express();
const port=process.env.PORT || 3000;

const router=require('../routes/authorization');
const {isTokenPresent}=require('./middleware/isTokenPresent')


const staticPath=path.join(__dirname,"../public");
const templete_Path =path.join(__dirname,"../templets/views")

app.use(express.static(staticPath))
app.use(cookieParser());
app.set("view engine","hbs");
app.set("views",templete_Path)

app.use(express.json())

app.get("/",isTokenPresent,(req,res)=>{
    res.render("home");
})
// app.get("/login",(req,res)=>{
//     res.render("login");
// })
// app.get("/signup",(req,res)=>{
//     res.render("signup");
// })
app.get("/data",isTokenPresent,(req,res)=>{
    res.render("data");
})
app.use(router);

app.listen(port,(err)=>{
    console.log("listening...");
    
})