const { MongoClient } = require("mongodb");
require("dotenv").config();

let client;
let db;

async function connectMongo() {
    if (db) return db;

    try {
        client = new MongoClient(process.env.MONGO_URI);
        await client.connect();
        db = client.db("recipe_nosql");  
        console.log("Connected to MongoDB!");
        return db;
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
}

module.exports = connectMongo;
