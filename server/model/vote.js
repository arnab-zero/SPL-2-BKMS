const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  discussionId: {
    type: String,
    required: true,
  },
  upvote: {
    type: Number,
    default: 0,
  },
  downvote: {
    type: Number,
    default: 0,
  },
  upVoteUsers: [{
    type: String,
  }],
  downVoteUsers: [{
    type: String,
  }],
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;