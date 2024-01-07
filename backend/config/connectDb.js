const mongoose=require('mongoose')
const colors=require('colors')
require('dotenv').config();

// const connectDb=async()=>{
    
// mongoose.connect(
//     process.env.MONGOURI
// )
// .then(() => console.log('DB Connected Successfull'))
// .catch((err) => {
//     console.log("error connecting database")
//     console.error(err);
// });
// }

// connectDb();



const connectDb = async () => {
    try{
        console.log(process.env.MONGOURI);
        await mongoose.connect(process.env.MONGOURI);
        console.log('DB Connected Successfully');
    }
    catch(err) {
        console.log("error connecting database");
        console.error(err);
        process.exit(0);
    }
};

connectDb();
// const mongoose = require("mongoose");
// require("dotenv").config();
// const MONGOURI = process.env.MONGOURI;
// console.log(MONGOURI);

// const Connection = async () => {
//   mongoose.set("strictQuery", true);
//   mongoose
//     .connect(MONGOURI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     })
//     .then(() => console.log("connection successfull .."))
//     .catch((err) => console.log("error is ----- >>>>> ------ \n", err));
// };
// Connection();