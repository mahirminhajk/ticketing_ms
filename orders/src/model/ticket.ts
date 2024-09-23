import { Model, model, Schema } from "mongoose";
import { ITickets } from "../types";

//* interface for simple tickets Attributes
type ticketsAttrsType = {
  title: string;
  price: string;
};
//* interface for tickets model
interface ITicketsModel extends Model<ITickets> {
  build(attrs: ticketsAttrsType): ITickets;
}

//* tickets schema
const ticketsSchema: Schema<ITickets> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

//* static methods for tickets model
ticketsSchema.statics.build = (attrs: ticketsAttrsType) => {
  return new tickets(attrs);
};

//* tickets model
const tickets: ITicketsModel = model<ITickets, ITicketsModel>(
  "ticket",
  ticketsSchema
);

//* export
export default tickets;
