import { Request, Response, NextFunction } from "express";

function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isArray = Array.isArray(error.errors);
  res.status(error.status || 500).json({
    error: isArray
      ? [...error.errors]
      : [error.errors] || "Internal Server Error",
  });
}

export default errorHandler;
