import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errorFormater = ({ msg, param }) => ({ message: msg, param });
  const errors = validationResult(req).formatWith(errorFormater);
  if (!errors.isEmpty()) {
    return next({
      status: 400,
      errors: errors.array().map((error) => {
        return {
          message: error.message,
          param: error.param,
        };
      }),
    });
  }
  next();
}
