import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("Please define the MONGODB_URI");
}

const databaseName = process.env.DBNAME || "test";

declare global {
  var authMongoClient: MongoClient | undefined;
}

const mongoClient = globalThis.authMongoClient ?? new MongoClient(mongoUri);

if (process.env.NODE_ENV !== "production") {
  globalThis.authMongoClient = mongoClient;
}

export const auth = betterAuth({
  database: mongodbAdapter(mongoClient.db(databaseName), {
    client: mongoClient,
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
});