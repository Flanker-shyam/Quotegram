const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config();

const connectDB = (url)=> {
   mongoose.
   connect(url)
   .then(()=>{
      console.log(`connected successfully to port 27017`);
   })
   .catch((err)=>{
    console.log(`err:  ${err}`);
    process.exit();
   });
}

module.exports = connectDB;