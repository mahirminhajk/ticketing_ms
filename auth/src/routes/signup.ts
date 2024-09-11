import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = Router();

router.post("/users/signup",[
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20 characters")
], (req: Request, res: Response) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {

    res.status(201).json({ message: "User created successfully", email, password });

  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Something went wrong. Please try again later.", error });
  }
});

export default router;
