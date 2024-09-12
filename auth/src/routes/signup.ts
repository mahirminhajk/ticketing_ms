import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError, BadRequestError } from "../errors";
import User from "../models/user";

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
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new RequestValidationError(errors.array()));
    }
    const { email, password } = req.body;

    console.log("Creating a user...");
    

    try {
      //* existing user
      const existingUser = await User.findOne({email});
      if (existingUser) {
        return next(new BadRequestError("Email in use"));
      }

      //TODO: hash password

      //* create user
      const user = User.build({ email, password });
      await user.save();

      //TODO: generate jwt

      //* send response
      res.status(201).json(user);

    } catch (error) {
      if (error instanceof Error) {
        return next(new BadRequestError(error.message));
      }
      return next(new BadRequestError("An error occurred"));
    }
  }
);

export default router;
