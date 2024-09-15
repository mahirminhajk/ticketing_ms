import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../app";

let mongo: MongoMemoryServer;
beforeAll(async () => {
    mongo = new MongoMemoryServer();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
});

beforeAll(async () => {
    await mongoose.connection.dropDatabase();
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongo.stop();
});