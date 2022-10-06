const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Member = require("../models").Member;
const { standardUser, adminUser, logIn } = require("./test_helper");

describe("GET /members", () => {
  test("Succeeds if user is not logged in", async () => {
    await api
      .get("/api/members")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);
});
