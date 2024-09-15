import request from "supertest";
import app from "../../app";

it("clears the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test11@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app).get("/api/users/signout").expect(200);

  const cookies = response.get("Set-Cookie");
  expect(cookies && cookies[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
