const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  tags:{type:Array, required:true},
  timestamp: { type: Date, default: Date.now },
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 }
});


const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
