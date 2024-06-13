const express = require('express');
const router = express.Router();
const Paper = require("../model/submittedPapers");
const User = require("../model/user")
//const { connectToDatabase } = require('../db.js');

router.post('/paper/approve', async (req, res) => {
    const { paperId } = req.body;

    try {
        const paper = await Paper.findByIdAndUpdate(
            paperId,
            { status: 'approved' },
            { new: true }
        );

        if (!paper) {
            return res.status(404).json({ message: 'Paper not found' });
        }

        const user = await User.findOneAndUpdate(
            { email: paper.email },
            { $inc: { rewardPoints: 10 } },
            { $inc: { paperApproved: 1 } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            paper,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

router.post('/paper/reject', async (req, res) => {
    const { paperId } = req.body;

    try {
        const paper = await Paper.findByIdAndUpdate(
            paperId,
            { status: 'rejected' },
            { new: true }
        );

        if (!paper) {
            return res.status(404).json({ message: 'Paper not found' });
        }

        const user = await User.findOneAndUpdate(
            { email: paper.email },
            { $inc: { paperRejected: 1 } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ paper });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;