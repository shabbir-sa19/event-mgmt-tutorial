import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { randomUUID } from "node:crypto";
import { z } from "zod";

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

export const authDatabase = mongoClient.db(databaseName);

const adminEmails = new Set(
  (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
);

export const isAdminEmail = (email: string) => adminEmails.has(email.toLowerCase());

export const auth = betterAuth({
  database: mongodbAdapter(authDatabase, {
    client: mongoClient,
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      userID: {
        type: "string",
        required: true,
        unique: true,
        input: false,
        defaultValue: () => `usr_${randomUUID()}`,
      },
      phone: {
        type: "string",
        required: true,
        unique: true,
        validator: { input: z.e164() },
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "employee",
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => ({
          data: {
            ...user,
            role: isAdminEmail(user.email) ? "admin" : "employee",
          },
        }),
      },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
});