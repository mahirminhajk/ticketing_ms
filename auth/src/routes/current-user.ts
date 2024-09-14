import { NextFunction, Request, Response, Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.get(
  "/users/currentuser",
  (req: Request, res: Response, next: NextFunction) => {
    //* check session and session.jwt avaiable
    if (!req.session?.jwt) return res.json({ currentUser: null });

    try {
      const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
      res.json({ currentUser: payload });
    } catch (error) {
      res.json({ currentUser: null });
    }
  }
);

export default router;
