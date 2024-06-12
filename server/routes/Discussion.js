const express = require('express');
const router = express.Router();
const Discussion = require('../model/discussion');

router.get('/discussions/:paperId', async (req, res) => {
    try {
      const paperId = req.params.paperId;
  
      const discussions = await Discussion.find({ paperId });
  
      res.json(discussions);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

router.post('/discussions', async (req, res) => {
  try {
    const { paperId, email, content } = req.body;

    const newDiscussion = new Discussion({
      paperId,
      email,
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
      const { email, content } = req.body;
  
      const updatedDiscussion = await Discussion.findByIdAndUpdate(
        discussionId,
        {
          $push: {
            answers: { email, content }
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
        vote = new Vote({ discussionId, users: [] });
      }
  
      const userIndex = vote.users.indexOf(email);
      if (userIndex === -1) {
        vote.users.push(email);
        vote.upvote++;
      } else {
        return res.status(400).json({ error: 'User has already voted' });
      }
  
      const updatedVote = await vote.save();
  
      res.json(updatedVote);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.post('discussions/downvote', async (req, res) => {
    try {
      const { discussionId, email } = req.body;
  
      let vote = await Vote.findOne({ discussionId });
  
      if (!vote) {
        vote = new Vote({ discussionId, users: [] });
      }
  
      const userIndex = vote.users.indexOf(email);
      if (userIndex === -1) {
        vote.users.push(email);
        vote.downvote++;
      } else {
        return res.status(400).json({ error: 'User has already voted' });
      }
  
      const updatedVote = await vote.save();
  
      res.json(updatedVote);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;