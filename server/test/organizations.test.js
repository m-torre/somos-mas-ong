const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const { standardUser, adminUser, logIn } = require("./test_helper");

jest.mock("../middleware/imageUpload");
const imageUpload = require("../middleware/imageUpload");
const busboy = require("busboy");

imageUpload.mockImplementation((req, res, next) => {
  const bb = busboy({ headers: req.headers });
  bb.on("field", (name, val, info) => {
    req.body[name] = val;
  });
  req.pipe(bb);

  req.file = {
    originalname: "Test",
    mimetype: "test/test",
    location: "http://testURL.com/testFile.test",
  };

  next();
});

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
          .set("Content-Type", "multipart/form-data")
          .field("name", "Test")
          .field("email", "test@test.com")
          .expect(200);
      }, 100000);
    });
  });
});
