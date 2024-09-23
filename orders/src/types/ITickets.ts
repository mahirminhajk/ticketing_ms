import { OrderStatus } from "@km12dev/common";
import { Document } from "mongoose";

export interface ITickets extends Document {
  title: string;
  price: string;
}

export default ITickets;
