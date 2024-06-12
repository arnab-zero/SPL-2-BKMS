const express = require('express');
const router = express.Router();
const Discussion = require('../model/discussion');
const Vote = require('../model/vote');

router.get('/discussions/:paperId', async (req, res) => {
  try {
    const paperId = req.params.paperId;
    const discussions = await Discussion.find({ paperId })
      .populate('answers.email')
      .sort({ upvote: -1 })
      .exec();
    res.json(discussions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/discussions', async (req, res) => {
  try {
    const { paperId, email, photoURL, content } = req.body;
    const newDiscussion = new Discussion({
      paperId,
      email,
      photoURL,
      content,
      answers: []
    });
    const savedDiscussion = await newDiscussion.save();
    res.status(201).json(savedDiscussion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/discussions/answers/:discussionId', async (req, res) => {
  try {
    const discussionId = req.params.discussionId;
    const { email, photoURL, content } = req.body;
    const updatedDiscussion = await Discussion.findByIdAndUpdate(
      discussionId,
      {
        $push: {
          answers: { email, photoURL, content }
        }
      },
      { new: true }
    );
    if (!updatedDiscussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }
    res.json(updatedDiscussion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/discussions/upvote', async (req, res) => {
  try {
    const { discussionId, email } = req.body;
    const vote = await Vote.findOne({ discussionId });

    if (vote && vote.upVoteUsers.includes(email)) {
      return res.status(400).json({ error: 'User has already upvoted this discussion' });
    }

    const updatedVote = await Vote.findOneAndUpdate(
      { discussionId },
      {
        $addToSet: { upVoteUsers: email },
        $pull: { downVoteUsers: email }
      },
      { new: true, upsert: true }
    );

    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      {
        $inc: {
          upvote: 1,
          downvote: updatedVote && updatedVote.downVoteUsers.includes(email) ? -1 : 0
        }
      },
      { new: true }
    );

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    res.json({ vote: updatedVote, discussion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/discussions/downvote', async (req, res) => {
  try {
    const { discussionId, email } = req.body;
    const vote = await Vote.findOne({ discussionId });

    if (vote && vote.downVoteUsers.includes(email)) {
      return res.status(400).json({ error: 'User has already downvoted this discussion' });
    }

    const updatedVote = await Vote.findOneAndUpdate(
      { discussionId },
      {
        $addToSet: { downVoteUsers: email },
        $pull: { upVoteUsers: email }
      },
      { new: true, upsert: true }
    );

    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      {
        $inc: {
          downvote: 1,
          upvote: updatedVote && updatedVote.upVoteUsers.includes(email) ? -1 : 0
        }
      },
      { new: true }
    );

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    res.json({ vote: updatedVote, discussion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;