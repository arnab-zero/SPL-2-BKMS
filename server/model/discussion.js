const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    default: "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const discussionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    default: "https://as2.ftcdn.net/v2/jpg/03/49/49/79/1000_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
  },
  content: {
    type: String,
    required: true
  },
  upvote: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  answers: [answerSchema],
  paperId: {
    type: String,
    required: true
  }
});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;