const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db.js');

// POST method to filter papers by topic name
router.post('/data/filter', async (req, res) => {
    const { topicName } = req.body;

    if (!topicName) {
        return res.status(400).json({ error: 'Topic name is required in the request body' });
    }

    let driver;

    try {
        driver = await connectToDatabase();
        const session = driver.session();

        // Neo4j query to filter papers related to the given topic
        const result = await session.run(`
      MATCH (t:Topic { name: $topicName })-[:CONTAINS]->(p:Paper)
      RETURN t, p
    `, { topicName });

        const data = result.records.map(record => ({
            topic: record.get('t'),
            paper: record.get('p'),
        }));

        res.json(data);
    } catch (error) {
        console.error('Error filtering data from Neo4j:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        // Close the driver connection
        if (driver) {
            await driver.close();
        }
    }
});

module.exports = router;