import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import properties from "../properties";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({
      status: 400,
      message: "No JWT token found!!",
    });
    return;
  }

  try {
    const verified = jwt.verify(
      token.split("Bearer ")[1],
      properties.jwtSecretKey
    );
    if (verified) {
      //@ts-ignore
      const userID = verified.userID;
      res.locals.userID = userID;
      next();
    }
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};

export default auth;