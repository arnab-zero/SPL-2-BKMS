const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
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
  content: {
    type: String,
    required: true
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