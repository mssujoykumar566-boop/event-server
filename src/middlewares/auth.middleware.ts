import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
// import { auth } from "../lib/auth.js";


export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const headers = new Headers();

    Object.entries(req.headers).forEach(([key, value]) => {

      if (value) {
        headers.set(
          key,
          Array.isArray(value)
            ? value.join(",")
            : value
        );
      }

    });


    const session = await auth.api.getSession({
      headers,
    });


    console.log("SESSION:", session);


    if (!session) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });

    }


   req.user = {

 id: session.user.id,

 name: session.user.name,

 email: session.user.email,

 role: session.user.role ?? "user",

};

    next();


  } catch (error) {

    console.log("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });

  }

};