import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //* remove comment to see error in console
  // console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  res.status(400).json({
    errors: [{ message: err.message || "Something went wrong" }],
  });
};
