import app from "./app";
import mongoose from "mongoose";

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
