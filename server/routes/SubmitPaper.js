const express = require('express');
const router = express.Router();
const Paper = require("../model/submittedPapers");

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
