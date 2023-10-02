const mongoose = require("mongoose");
const User = require("./userModel");
const Quote = require("./QuoteModel");

const likeSchema = new mongoose.Schema({
    userID : {type:mongoose.Schema.Types.ObjectId, ref:User, require:true},
    quoteID:{type:mongoose.Schema.Types.ObjectId, ref:Quote, require:true},
    timestamp:{type:Date, default:Date.now}
});

const LikeModel = mongoose.model('Likes', likeSchema);

module.exports = LikeModel;