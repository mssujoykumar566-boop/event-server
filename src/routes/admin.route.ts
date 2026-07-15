import express from "express";



import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import { adminDeleteEvent, deleteUser, getAllEvents, getAllUsers, getReports, updateUserRole } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", authMiddleware, requireRole("admin"), getAllUsers);

router.get(
  "/events",
  authMiddleware,
  requireRole("admin"),
  getAllEvents
);

router.get(
 "/reports",
 authMiddleware,
 requireRole("admin"),
 getReports
);

router.patch(
 "/users/:id/role",
 authMiddleware,
 requireRole("admin"),
 updateUserRole
);

router.delete(
  "/events/:id",
  authMiddleware,
  requireRole("admin"),
  adminDeleteEvent
);

router.delete(
  "/users/:id",
  authMiddleware,
  requireRole("admin"),
  deleteUser
);

export default router;
