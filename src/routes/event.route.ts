import { Router } from "express";
import {
  createEvent,
  getEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
  getDashboardStats
} from "../controllers/event.controller.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createEventValidation } from "../validations/event.validation.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();


router.post(
 "/",
 authMiddleware,
 requireRole("organizer"),
 validateRequest(createEventValidation),
 createEvent
);

router.get("/", getEvents);

router.get(
 "/my-events",
 authMiddleware,
 getMyEvents
);

router.get(
 "/dashboard-stats",
 authMiddleware,
 getDashboardStats
);

router.get("/:id", getSingleEvent);

router.patch(
  "/:id",
  authMiddleware,
  requireRole("organizer"),
  updateEvent
);

router.delete(
 "/:id",
 authMiddleware,
 requireRole("organizer"),
 deleteEvent
);





export default router;