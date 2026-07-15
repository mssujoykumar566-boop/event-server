import { Router } from "express";
import { auth } from "../auth/auth.js";

const router = Router();

router.use(async (req, res) => {
  return auth.handler(req, res);
});

export default router;