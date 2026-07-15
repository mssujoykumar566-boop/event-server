import express from "express";
import { getMyJoinedEvents, joinEvent } from "../controllers/registration.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/events/:id/join", authMiddleware, requireRole("user"), joinEvent);

router.get(
 "/registrations/my-events",
 authMiddleware,
 getMyJoinedEvents
);

export default router;
