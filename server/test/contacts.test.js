const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Contact = require("../models").Contact;
const { standardUser, adminUser, logIn } = require("./test_helper");

jest.mock("../middleware/imageUpload");
const imageUpload = require("../middleware/imageUpload");
const busboy = require("busboy");

imageUpload.mockImplementation((req, res, next) => {
  const bb = busboy({ headers: req.headers });
  bb.on("field", (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
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

describe("GET /contacts", () => {
  test("Fails if user is not logged in", async () => {
    await api.get("/api/contacts").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await logIn(standardUser);

      await api
        .get("/api/contacts")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(401);
    }, 100000);

    test("Succeeds if user is admin", async () => {
      const loggedUser = await logIn(adminUser);

      await api
        .get("/api/contacts")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    }, 100000);
  });
});

describe("POST /contacts", () => {
  test("Fails if required data is not complete", async () => {
    await api
      .post("/api/contacts")
      .set("Content-Type", "application/json")
      .send({
        name: "Test Contact",
      })
      .expect(400);
  }, 100000);

  test("Succeeds if required data is complete", async () => {
    await api
      .post("/api/contacts")
      .set("Content-Type", "application/json")
      .send({
        name: "Test Contact",
        phone: "12345678",
        email: "test@test.com",
        message: "This is a test.",
      })
      .expect(201);
  }, 100000);
});
