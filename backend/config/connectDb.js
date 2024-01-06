const mongoose=require('mongoose')
const colors=require('colors')
require('dotenv').config();

const connectDb=async()=>{
mongoose.connect(
    process.env.MONGOURI
)
.then(() => console.log('DB Connected Successfull'))
.catch((err) => {
    console.error(err);
});
}

connectDb();