import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { db } from "../lib/mongodb.js";



export const auth = betterAuth({

  database: mongodbAdapter( db),


  emailAndPassword: {
    enabled: true,
  },


   secret: process.env.BETTER_AUTH_SECRET,

  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [
    "http://localhost:5000",
    "http://localhost:3000"
  ],


});