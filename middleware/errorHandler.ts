import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log the error details to the console
  console.error(err.stack);

  // Set the status code and send the error message to the client
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
}

export default errorHandler;
