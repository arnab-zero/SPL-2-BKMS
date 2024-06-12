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
      vote = new Vote({ discussionId, upVoteUsers: [] });
    }

    const userIndex = vote.upVoteUsers.indexOf(email);
    if (userIndex === -1) {
      vote.upVoteUsers.push(email);
      vote.upvote++;

      const discussion = await Discussion.findById(discussionId);
      if (discussion) {
        discussion.upvotes++;
        await discussion.save();
      } else {
        return res.status(404).json({ error: 'Discussion not found' });
      }

      const updatedVote = await vote.save();

      res.json(updatedVote);
    } else {
      return res.status(400).json({ error: 'User has already voted' });
    }
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
      vote = new Vote({ discussionId, downVoteUsers: [] });
    }

    const userIndex = vote.downVoteUsers.indexOf(email);
    if (userIndex === -1) {
      vote.downVoteUsers.push(email);
      vote.downvote++;

      const discussion = await Discussion.findById(discussionId);
      if (discussion) {
        discussion.downvote++;
        await discussion.save();
      } else {
        return res.status(404).json({ error: 'Discussion not found' });
      }

      const updatedVote = await vote.save();

      res.json(updatedVote);
    } else {
      return res.status(400).json({ error: 'User has already voted' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;