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
    let vote = await Vote.findOne({ discussionId });
    let isPresentDown = false;

    if (!vote) {
      vote = new Vote({ discussionId, upVoteUsers: [email], downVoteUsers: [] });
    } else if (vote.upVoteUsers.includes(email)) {
      return res.status(400).json({ error: 'User has already upvoted this discussion' });
    } else {
      vote.upVoteUsers.push(email);
      if(vote.downVoteUsers.includes(email))
      {
        isPresentDown = true;
        vote.downVoteUsers = vote.downVoteUsers.filter(email => email !== email);
      }
    }

    const updatedVote = await vote.save();

    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      {
        $inc: {
          upvote: 1,
          downvote: isPresentDown ? -1 : 0
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
    let vote = await Vote.findOne({ discussionId });
    let isPresentUp = false;

    if (!vote) {
      vote = new Vote({ discussionId, downVoteUsers: [email], upVoteUsers: [] });
    } else if (vote.downVoteUsers.includes(email)) {
      return res.status(400).json({ error: 'User has already downvoted this discussion' });
    } else {
      vote.downVoteUsers.push(email);
      if(vote.upVoteUsers.includes(email))
        {
          isPresentUp = true;
          vote.upVoteUsers = vote.upVoteUsers.filter(email => email !== email);
        }
    }

    const updatedVote = await vote.save();

    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      {
        $inc: {
          downvote: 1,
          upvote: isPresentUp ? -1 : 0
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