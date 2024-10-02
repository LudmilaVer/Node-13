const mongoose = require('mongoose');

const magazineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issueNumber: Number,
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    required: true,
  },
});

const Magazine = mongoose.model('Magazine', magazineSchema);
module.exports = Magazine;
