const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const User = require("../models").User;
const { standardUser, adminUser, logIn } = require("./test_helper");

describe("GET /users", () => {
  test("Fails if user is not logged in", async () => {
    await api.get("/api/users").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await logIn(standardUser);

      await api
        .get("/api/users")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(401);
    }, 100000);

    test("Succeeds if user is admin", async () => {
      const loggedUser = await logIn(adminUser);

      await api
        .get("/api/users")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    }, 100000);
  });
});

describe("PUT /users/:id", () => {
  test("Fails if user is not logged in", async () => {
    await api.put("/api/users/1").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      const loggedUser = await logIn(standardUser);

      await api
        .put(`/api/users/${invalidId}`)
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(400);
    }, 100000);

    test("Succeeds if id is valid", async () => {
      const newUserData = {
        firstName: "Test",
        lastName: "User",
        email: "testUser1@test.com",
        password: "vvyEU3tu",
      };

      await api
        .post("/api/auth/register")
        .send(newUserData)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const newUser = await User.findOne({
        where: { email: newUserData.email },
      });

      const loggedUser = await logIn(newUserData);

      await api
        .put(`/api/users/${newUser.id}`)
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .set("Content-Type", "multipart/form-data")
        .field("firstName", "Juan")
        .field("lastName", "Pérez")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    }, 100000);
  });
});

describe("DELETE /users/:id", () => {
  test("Fails if user is not logged in", async () => {
    await api.delete("/api/users/1").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      const loggedUser = await logIn(standardUser);

      await api
        .delete(`/api/users/${invalidId}`)
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(400);
    }, 100000);

    test("Succeeds if id is valid", async () => {
      const newUser = {
        firstName: "Test",
        lastName: "User",
        email: "testUser2@test.com",
        password: "vvyEU3tu",
      };

      await api
        .post("/api/auth/register")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const newUserData = await User.findOne({
        where: { email: newUser.email },
      });

      const loggedUser = await logIn(standardUser);

      await api
        .delete(`/api/users/${newUserData.id}`)
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(204);
    }, 100000);
  });
});
