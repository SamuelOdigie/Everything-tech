import { MongoClient } from "mongodb";

export function connectToDatabase() {
  const client = new MongoClient(process.env.DBSTRING);
  return client;
}
