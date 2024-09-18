import jwt from "jsonwebtoken";

//? mock a user sign in, by creating a session cookie
export const signin = () => {
  const payload = {
    id: "1234",
    email: "test@test.com",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`session=${base64}`];
};
