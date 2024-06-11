const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db');

router.get('/topics', async (req, res) => {
    let driver;

    try {
        driver = await connectToDatabase();
        const session = driver.session();

        const result = await session.run(`
        MATCH (n:Topic) RETURN n`);

        const data = result.records.map(record => ({
            topic: record.get('n')
        }));

        res.json(data);
    } catch(error) {
        console.error('Error fetching data from Neo4j:', error);
        res.status(500).json({error: 'Internal server error' });
    } finally {
        if(driver) {
            await driver.close();
        }
    }
});

module.exports = router;