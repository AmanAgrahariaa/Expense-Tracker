const mongoose=require('mongoose')


const userschema=new mongoose.Schema({
    name:{
         type:String,
         required:[true,"name required"]
    },
    email: {
        type:String,
        required:[true,"email is required and should be unique"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password required"]
    },
},
{timestamps:true}  

);

const userModel=mongoose.model("users",userschema);

module.exports=userModel;