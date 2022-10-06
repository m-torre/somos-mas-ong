const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const { standardUser, logIn } = require("./test_helper");

describe("POST /auth/register", () => {
  test("Fails if the required user data is not complete", async () => {
    const newUserData = {
      firstName: "Test",
      lastName: "User",
    };

    await api
      .post("/api/auth/register")
      .send(newUserData)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("Succeeds if the required user data is complete", async () => {
    const newUserData = {
      firstName: "Test",
      lastName: "User",
      email: "testUser3@test.com",
      password: "vvyEU3tu",
    };

    await api
      .post("/api/auth/register")
      .send(newUserData)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  }, 100000);
});

describe("POST /auth/login", () => {
  test("Fails if the user data is not valid", async () => {
    await api
      .post("/api/auth/login")
      .send({
        email: "wrongEmail@test.com",
        password: "wrongPassword",
      })
      .expect(401)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("Succeeds if the user data is valid", async () => {
    await api
      .post("/api/auth/login")
      .send({
        email: standardUser.email,
        password: standardUser.password,
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);
});

describe("GET /auth/me", () => {
  test("Fails if the user is not logged in", async () => {
    await api
      .get("/api/auth/me")
      .set("Authorization", "Bearer wrongToken")
      .expect(401)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("Succeeds if the user is logged in", async () => {
    const loggedUser = await logIn(standardUser);

    await api
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${loggedUser.body.token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);
});
