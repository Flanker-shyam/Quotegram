const mongoose = require("mongoose");

const imageScheme = ({
    imageUrl: String,
    description: String
});

module.exports = mongoose.model("Image", imageScheme);