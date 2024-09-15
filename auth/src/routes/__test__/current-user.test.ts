import request from "supertest";
import app from "../../app";
import { signup } from "../../test/helpers/authTestHelper";

it("responds with details about the current user", async () => {
  const cookie =await signup("test12@test.com", "password");

  if (!cookie) {
    throw new Error("Cookie not found");
  }

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);

    expect(response.body.currentUser.email).toEqual("test12@test.com");

});

it("responds with null if not authenticated", async () => {
  const response = await request(app).get("/api/users/currentuser").expect(200);

  expect(response.body.currentUser).toEqual(null);
});
