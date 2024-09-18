import { Document } from "mongoose";

export interface ITickets extends Document {
  title: string;
  price: string;
  userId: string;
}

export default ITickets;
