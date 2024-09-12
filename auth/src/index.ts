import express from "express";
import {
  currentUserRouter,
  signoutRouter,
  signupRouter,
  signinRouter,
} from "./routes";
import { errorHandler } from "./middleware";
import { NotFoundError } from "./errors";
import mongoose from "mongoose";

//* app
const app = express();

//* middleware
app.use(express.json());

//* routes
app.use("/api", currentUserRouter);
app.use("/api", signinRouter);
app.use("/api", signupRouter);
app.use("/api", signoutRouter);

//* not found route
app.all("*", () => {
  throw new NotFoundError();
});

//* error handling
app.use(errorHandler);

//* connect to mongodb
const startServer = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to Auth mongodb");
  } catch (error) {
    console.error(error);
  }

  //* listen
  app.listen(3000, () => {
    console.log("Auth service listening on port 3000");
  });
};

startServer();
