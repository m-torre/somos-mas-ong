const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Organization = require("../models").Organization;
const { standardUser, adminUser, logIn } = require("./test_helper");

describe("GET /organizations/:id", () => {
  test("Fails if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";
    await api.get(`/api/organizations/${invalidId}`).expect(400);
  }, 100000);

  test("Succeeds if id is valid", async () => {
    await api
      .get("/api/organizations/1")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);
});

describe("PUT /organizations/:id", () => {
  test("Fails if user is not logged in", async () => {
    await api.put("/api/organizations/1").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await logIn(standardUser);

      await api
        .put("/api/organizations/1")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(401);
    }, 100000);

    describe("If user is admin", () => {
      test("Fails if id is invalid", async () => {
        const loggedUser = await logIn(adminUser);
        const invalidId = "5a3d5da59070081a82a3445";

        await api
          .put(`/api/organizations/${invalidId}`)
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .expect(400);
      }, 100000);

      test("Succeeds if id is valid", async () => {
        const loggedUser = await logIn(adminUser);

        await api
          .put("/api/organizations/1")
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .send({
            name: "Test",
            email: "test@test.com",
          })
          .expect(200);
      }, 100000);
    });
  });
});
