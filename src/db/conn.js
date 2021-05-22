const mongoose = require("mongoose");
const express = require("express");
const uri = process.env.MONGOOSE_URI || "mongodb://localhost:27017/jwt";
const app = express();
mongoose.connect(uri,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        // app.listen(3000);
        console.log("db connected");
    }).catch((err) => {
        console.log(err);
    })
