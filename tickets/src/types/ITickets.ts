import { Document } from "mongoose";

export interface ITickets extends Document {
  title: string;
  price: string;
  userId: string;
  version: number;
}

export default ITickets;
