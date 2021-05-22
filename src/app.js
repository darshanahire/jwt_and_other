const express= require("express");
const cookieParser= require('cookie-parser');
const path =require("path");
const hbs= require("hbs");
const app=express();
const port=process.env.PORT || 3000;

const authroutes=require('../routes/authroutes');
const {requireauth}=require('../src/middleware/authmiddleware')


const staticPath=path.join(__dirname,"../public");
const templete_Path =path.join(__dirname,"../templets/views")

app.use(express.static(staticPath))
app.use(cookieParser());
app.set("view engine","hbs");
app.set("views",templete_Path)

app.use(express.json())

app.get("/",requireauth,(req,res)=>{
    res.render("home");
})
// app.get("/login",(req,res)=>{
//     res.render("login");
// })
// app.get("/signup",(req,res)=>{
//     res.render("signup");
// })
// app.get("/data",(req,res)=>{
//     res.render("data");
// })
app.use(authroutes);

app.listen(port,(err)=>{
    console.log("listening...");
    
})