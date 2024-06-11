const express = require('express');
const router = express.Router();
const Paper = require("../model/submittedPapers");

router.get('/submittedPapers', async (req, res) => {
    try {
        const papers = await Paper.find();
        res.status(200).json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server Error"});
    }
});

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
        const { topic, title, author, link, publicationDate, abstract } = req.body;
  
        const newPaper = new Paper({
            topic,
            title,
            author,
            link,
            publicationDate,
            abstract
        });

        const savedPaper = await newPaper.save();

        res.status(201).json(savedPaper);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
