import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

export const auth = betterAuth({
  database: mongodbAdapter(client.db("event")),

  user: {
    additionalFields: {
      role: {
        type: "string",

        required: true,

        defaultValue: "user",
      },
    },
  },
});
