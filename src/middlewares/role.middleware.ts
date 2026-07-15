import { Request, Response, NextFunction } from "express";
import { UserRole } from "../types/user.type.js";

export const requireRole = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized user",
      });
    }

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,

        message: "Access denied",
      });
    }

    next();
  };
};
