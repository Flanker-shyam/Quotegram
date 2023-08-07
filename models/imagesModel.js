const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
  tags:{
    type:Array,
    required: true,
  }
});

module.exports = mongoose.model("Image", imageSchema);