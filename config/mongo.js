const { MongoClient } = require('mongodb');
require('dotenv').config();

let client;

// Return a connected Mongo DB instance (lazily created and reused)
async function getMongoDb() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017';
  if (!client) {
    client = new MongoClient(mongoUri);
    await client.connect();
  }

  const dbName = process.env.MONGO_DB || 'recipe_app';
  return client.db(dbName);
}

async function closeMongo() {
  if (client) {
    await client.close();
    client = null;
  }
}

module.exports = { getMongoDb, closeMongo };
