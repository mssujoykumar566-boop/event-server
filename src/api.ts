import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";


let connected = false;


export default async function handler(
 req:any,
 res:any
){

 if(!connected){

   await connectDB();

   connected = true;

 }


 return app(req,res);

}