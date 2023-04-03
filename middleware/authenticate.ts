import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateJWT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Invalid Token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).send("Invalid Token");
    }
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}
