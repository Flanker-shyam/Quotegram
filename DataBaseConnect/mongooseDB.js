const mongoose = require("mongoose");
const dbDebugger = require("debug")("app : db");
const dotenv = require("dotenv")
dotenv.config();

const connectDB = (url)=> {
   mongoose.
   connect(url)
   .then(()=>{
    console.log(`connected successfully`);
   })
   .catch((err)=>{
    console.log(`err:  ${err}`);
    process.exit();
   });
}


// const connectDB = (url)=> {
//     mongoose
//     .connect(url, function (err) {
//     if (err) {
//         dbDebugger(err);
//     } else {
//         // dbDebugger("connection on 27017 is successfull");
//         console.log("connection on 27017 is successfull");
//     }
// });
// }

module.exports = connectDB;