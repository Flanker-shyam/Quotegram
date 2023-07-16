const mongoose = require("mongoose");

const imageScheme = new mongoose.Schema({
    imageUrl: String,
    description: String
});

module.exports = mongoose.model("Image", imageScheme);