const express = require('express');
const router = express.Router();
const Paper = require("../model/submittedPapers");
const User = require("../model/user")

router.get('/submittedPapers', async (req, res) => {
    try {
        const papers = await Paper.find();
        res.status(200).json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server Error"});
    }
});

router.get('/pendingPapers', async (req, res) => {
    try {
        const papers = await Paper.find({status : 'pending'});
        res.status(200).json(papers);
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Internal server Error"});
    }
})
router.get('/submittedPapers/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;

        const papers = await Paper.find({ email: userEmail });

        if (!papers || papers.length === 0) {
            return res.status(404).json({ message: "Papers not found for this email" });
        }

        res.status(200).json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post('/submitPaper', async (req, res) => {
    try {
        const { topic, title, author, link, publicationDate, abstract, email } = req.body;

 
        const newPaper = new Paper({
            topic,
            title,
            author,
            link,
            publicationDate,
            abstract,
            email
        });

        const savedPaper = await newPaper.save();

        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            { $inc: { paperSubmitted: 1 } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(201).json({
            paper: savedPaper,
            user: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
