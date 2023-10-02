const mongoose = require("mongoose");
const User = require("./userModel");
const Quote = require("./QuoteModel");

const commentSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId, ref:User, require:true},
    quoteID :{type:mongoose.Schema.Types.ObjectId,ref:Quote, require:true},
    content:{type:String, require:true}
});


const commentModel = mongoose.model('comments',commentSchema);
module.exports = commentModel;