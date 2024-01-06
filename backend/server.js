const express=require("express");
const cors=require('cors');
const morgan=require('morgan');
require('dotenv').config();
require('./config/connectDb');
const colors=require('colors')


const app=express()

// Middleware to log incoming requests
app.use((req, res, next) => {
   console.log(`Incoming ${req.method} request to ${req.path}`);
   next(); // Pass control to the next middleware or route handler
 });


//middlewares
app.use(morgan('dev'));
app.use(express.json())
app.use(cors())
// app.use()

//user routes
 app.use(require("./routes/userRoute"));


//transaction routes
app.use(require("./routes/transactionRoutes"));

const PORT=process.env.PORT || 8080;

 app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
 })

