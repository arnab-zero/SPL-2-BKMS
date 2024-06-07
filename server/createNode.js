const fs = require('fs').promises;
const { connectToDatabase } = require('./db.js');

async function importData() {
  let driver;
  try {
    driver = await connectToDatabase();
    const session = driver.session();

    const jsonData = await fs.readFile('paperData.json', 'utf-8');
    const data = JSON.parse(jsonData);

    // Create topic nodes and paper nodes with relationships
    for (const topic of data) {
      // Create topic node
      const createTopicQuery = `
        MERGE (t:Topic {name: $topic_name, summary: $summary})
      `;
      await session.run(createTopicQuery, {
        topic_name: topic.topic_name,
        summary: topic.summary
      });

      // Create paper nodes and relationships
      for (const paperData of topic.papers) {
        try {
          console.log('Paper data:', paperData);

          const createPaperQuery = `
            MERGE (p:Paper {
              title: $title,
              authors: $authors,
              abstract: $abstract,
              publication_date: $publication_date,
              link: $link,
              arxivId: $arxivId
            })
            MERGE (t:Topic {name: $topicName})
            MERGE (t)-[:CONTAINS]->(p)
          `;
          await session.run(createPaperQuery, {
            title: paperData.Title,
            authors: paperData.Authors,
            abstract: paperData.Abstract,
            publication_date: paperData.publication_date,
            link: paperData.Link,
            arxivId: paperData.arxiv_id,
            topicName: topic.topic_name
          });
        } catch (paperError) {
          console.error('Error importing paper data:', paperError);
        }
      }
    }

    console.log('Data imported successfully.');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    // Close the driver connection
    if (driver) {
      await driver.close();
      console.log('Connection closed.');
    }
  }
}

importData();
