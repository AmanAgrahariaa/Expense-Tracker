// const userModel=require('../models/userModel')

// //login callback
// const logincontroller=(req,res)=>{
//     try{
//        console.log(req);
//     }
//     catch(error){
//         res.status(400).json({
//             success:false,
//             error
//         })
//     }
// };

// //register callback
// const registercontroller=()=>{};

// module.exports={logincontroller,registercontroller};


const userModel = require("../models/userModel");

// login callback
const loginController = async (req, res) => {
  console.log("login req");
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  console.log("register req");
  try {
    const newUser = new userModel(req.body);
    console.log(req.body);
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = { loginController, registerController };
