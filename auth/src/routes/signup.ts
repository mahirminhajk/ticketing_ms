import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError, DatabaseConnectionError } from "../errors";

const router = Router();

router.post(
  "/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(new RequestValidationError(errors.array()));
    }

    const { email, password } = req.body;

    return next(new DatabaseConnectionError());

    res
      .status(201)
      .json({ message: "User created successfully", email, password });
  }
);

export default router;
