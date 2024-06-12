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

    if (!vote) {
      vote = new Vote({ discussionId, upVoteUsers: [], downVoteUsers: [] });
    }

    const userIndexInUpVotes = vote.upVoteUsers.indexOf(email);
    const userIndexInDownVotes = vote.downVoteUsers.indexOf(email);

    if (userIndexInUpVotes !== -1) {
      return res.status(400).json({ error: 'User has already upvoted' });
    }

    if (userIndexInDownVotes !== -1) {
      vote.downVoteUsers.splice(userIndexInDownVotes, 1);
      vote.downvote--;
    }

    vote.upVoteUsers.push(email);
    vote.upvote++;

    const discussion = await Discussion.findById(discussionId);
    if (discussion) {
      if (userIndexInDownVotes !== -1) {
        discussion.downvote--;
      }
      discussion.upvote++;
      await discussion.save();
    } else {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    const updatedVote = await vote.save();
    res.json(updatedVote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/discussions/downvote', async (req, res) => {
  try {
    const { discussionId, email } = req.body;

    let vote = await Vote.findOne({ discussionId });

    if (!vote) {
      vote = new Vote({ discussionId, upVoteUsers: [], downVoteUsers: [] });
    }

    const userIndexInUpVotes = vote.upVoteUsers.indexOf(email);
    const userIndexInDownVotes = vote.downVoteUsers.indexOf(email);

    if (userIndexInDownVotes !== -1) {
      return res.status(400).json({ error: 'User has already downvoted' });
    }

    if (userIndexInUpVotes !== -1) {
      vote.upVoteUsers.splice(userIndexInUpVotes, 1);
      vote.upvote--;
    }

    vote.downVoteUsers.push(email);
    vote.downvote++;

    const discussion = await Discussion.findById(discussionId);
    if (discussion) {
      if (userIndexInUpVotes !== -1) {
        discussion.upvote--;
      }
      discussion.downvote++;
      await discussion.save();
    } else {
      return res.status(404).json({ error: 'Discussion not found' });
    }

    const updatedVote = await vote.save();
    res.json(updatedVote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
