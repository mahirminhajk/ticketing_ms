import express from "express";
import {
  currentUserRouter,
  signoutRouter,
  signupRouter,
  signinRouter,
} from "./routes";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

import { errorHandler } from "./middleware";
import { NotFoundError } from "./errors";

//* app
const app = express();

//* trust proxy - express is behind a proxy (nginx)
app.set("trust proxy", true);
//* rejectUnauthorized - throw error if https is not used

//* middleware
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

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
  //* check env variables
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is not defined");
  }

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
