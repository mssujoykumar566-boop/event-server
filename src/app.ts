import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";

import eventRoutes from "./routes/event.route.js";
import authRoutes from "./routes/auth.route.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import registrationRoutes from "./routes/registration.route.js";
import adminRouter from "./routes/admin.route.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Better Auth Route (Express v5)
app.all("/api/auth/{*any}", toNodeHandler(auth));

// express.json() অবশ্যই Better Auth route-এর পরে
app.use(express.json());



app.use("/api/events", eventRoutes);

app.use(
 "/api",
 registrationRoutes
);

app.use(
 "/api/admin",
 adminRouter
);

app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EventSphere API Running Successfully",
  });
});


export default app;