const express = require('express');
const router = express.Router();
const { connectToDatabase } = require('../db.js');

router.get('/data', async (req, res) => {
  let driver;

  try {
    driver = await connectToDatabase();
    const session = driver.session();

    // Neo4j query to retrieve all properties of topics and papers
    const result = await session.run(`
      MATCH (t:Topic)-[:CONTAINS]->(p:Paper)
      RETURN t, p
      LIMIT 500
    `);

    const data = result.records.map(record => ({
      topic: record.get('t'),
      paper: record.get('p'),
    }));

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Neo4j:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the driver connection
    if (driver) {
      await driver.close();
    }
  }
});

router.get('/chart/data', async (req, res) => {
  let driver;

  try {
    driver = await connectToDatabase();
    const session = driver.session();

    // Neo4j query to retrieve all properties of topics and papers
    const result = await session.run(`
      MATCH (t:Topic)-[:CONTAINS]->(p:Paper)
      RETURN t, p
    `);

    const data = result.records.map(record => ({
      topic: record.get('t'),
      paper: record.get('p'),
    }));

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Neo4j:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the driver connection
    if (driver) {
      await driver.close();
    }
  }
});

module.exports = router;