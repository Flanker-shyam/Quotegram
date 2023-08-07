const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username:String,
    email: String,
    password: String,
});

module.exports = mongoose.model("User", usersSchema);