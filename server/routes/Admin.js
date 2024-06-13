const express = require('express');
const router = express.Router();
const Paper = require("../model/submittedPapers");
const User = require("../model/user");
const { connectToDatabase } = require("../db");

router.post('/paper/approve', async (req, res) => {
    const { paperId, topicName } = req.body;

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
            {
                $inc: {
                    rewardPoints: 10,
                    paperApproved: 1
                }
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const driver = await connectToDatabase();
        const session = driver.session();

        try {
            const { title, author, abstract, publicationDate, link, _id } = paper;
            let id = _id.toString();
            let authors = author;
            let arxivId = id;

            // Convert publicationDate to ISO string format
            const isoPublicationDate = publicationDate.toISOString();

            const createPaperQuery = `
                MERGE (p:Paper {
                  title: $title,
                  authors: $authors,
                  abstract: $abstract,
                  publicationDate: $isoPublicationDate,
                  link: $link,
                  arxivId: $arxivId
                })
                MERGE (t:Topic {name: $topicName})
                MERGE (t)-[:CONTAINS]->(p)
            `;

            await session.run(createPaperQuery, {
                title,
                authors,
                abstract,
                isoPublicationDate, // Use the ISO formatted date here
                link,
                arxivId,
                topicName
            });

            console.log('Paper node created in Neo4j database');
        } catch (error) {
            console.error('Error creating paper node in Neo4j database:', error);
        } finally {
            await session.close();
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
            {
                $inc: {
                    rewardPoints: 10,
                    paperRejected: 1
                }
            },
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
