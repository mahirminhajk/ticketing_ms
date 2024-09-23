import { Router, Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { BadRequestError, validateRequest, requireAuth, OrderStatus } from "@km12dev/common";
import { TicketCreatedPublisher } from "../events/publishers";

import Orders from "../model/order";
import Tickets from "../model/ticket";
import { natsWrapper } from "../nats-wrapper";

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

const router = Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .withMessage("TicketId is required")
      .isMongoId()
      .withMessage("TicketId must be a valid MongoDB id"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { ticketId } = req.body;
    try {

      const ticket = await Tickets.findById(ticketId);
      if (!ticket) {
        return next(new BadRequestError("Ticket not found"));
      }

      const isReserved = await ticket.isReserved();
      if(isReserved) {
        return next(new BadRequestError("Ticket is already reserved"));
      }

      const expiration = new Date();
      expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

      const order = Orders.build({
        userId: req.currentUser!.id,
        status: OrderStatus.Created,
        expiresAt: expiration,
        ticket,
      });

      await order.save();
      
      return res.status(201).json(order);
    } catch (error) {
      if (error instanceof Error) {
        return next(new BadRequestError(error.message));
      }
      return next(new BadRequestError("An unknown error occurred"));
    }
  }
);

export default router;
