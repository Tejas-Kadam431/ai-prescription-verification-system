const express = require('express');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get("/Health",(req,res)=>{
    res.status(200).json({
        status: "OK",
        message: "Service is running"
    });
});
module.exports = app;