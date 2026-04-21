import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function createMongoClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please add MONGODB_URI to your environment variables.");
  }

  const client = new MongoClient(uri);

  return client.connect();
}

function getMongoClientPromise() {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const clientPromise = createMongoClientPromise().catch((error) => {
        if (global._mongoClientPromise === clientPromise) {
          global._mongoClientPromise = undefined;
        }

        throw error;
      });

      global._mongoClientPromise = clientPromise;
    }

    return global._mongoClientPromise;
  }

  return createMongoClientPromise();
}

export async function getMongoDatabase() {
  const connectedClient = await getMongoClientPromise();

  return connectedClient.db();
}
