import { MongoClient } from "mongodb";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    // Use the cached connection if available
    return { client: cachedClient, db: cachedDb };
  }

  // Connect to the MongoDB cluster
  const client = new MongoClient(process.env.DBSTRING, {});

  await client.connect();

  const db = client.db();

  // Create a unique index on the email field in the users collection
  await db.collection("users").createIndex({ email: 1 }, { unique: true });

  // Cache the database connection
  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
