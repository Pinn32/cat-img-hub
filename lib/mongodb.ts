// Member: Tianpeng Xu
// MongoDB connection utilities

import { MongoClient } from "mongodb";

// extend global scope to cache MongoDB client in development
const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

// creates and connects a new MongoDB client
function createMongoClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please add MONGODB_URI to your environment variables.");
  }

  const client = new MongoClient(uri);

  return client.connect();
}

// returns a cached MongoDB client in development or a new one in production;
// prevents multiple connections during hot reload.
function getMongoClientPromise() {
  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClientPromise) {
      const clientPromise = createMongoClientPromise().catch((error) => {
        if (globalWithMongo._mongoClientPromise === clientPromise) {
          globalWithMongo._mongoClientPromise = undefined;
        }

        throw error;
      });

      globalWithMongo._mongoClientPromise = clientPromise;
    }

    return globalWithMongo._mongoClientPromise;
  }

  return createMongoClientPromise();
}

// returns a connected MongoDB database instance
export async function getMongoDatabase() {
  const connectedClient = await getMongoClientPromise();

  return connectedClient.db();
}
