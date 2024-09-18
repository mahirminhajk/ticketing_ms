import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest } from "@km12dev/common";

import Tickets from "../model/ticket";

const router = Router();

router.get(
  "/api/tickets/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const ticket = await Tickets.findById(id);
      if (!ticket) {
        return next(new BadRequestError("Ticket not found"));
      }

      return res.status(200).json(ticket);
    } catch (error) {
      if (error instanceof Error) {
        return next(new BadRequestError(error.message));
      }
      return next(new BadRequestError("An unknown error occurred"));
    }
  }
);

export default router;
