const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Activity = require("../models").Activity;
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

describe("GET /activities", () => {
  test("Succeeds when user is not logged in", async () => {
    await api
      .get("/api/activities")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);
});

describe("POST /activities", () => {
  test("Fails if user is not logged in", async () => {
    await api.post("/api/activities").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await logIn(standardUser);

      await api
        .post("/api/activities")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(401);
    }, 100000);

    describe("If user is admin", () => {
      test("Fails if required content is not complete", async () => {
        const loggedUser = await logIn(adminUser);

        await api
          .post("/api/activities")
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .set("Content-Type", "multipart/form-data")
          .field("name", "Test Activity")
          .expect(400);
      }, 100000);

      test("Succeeds if required content is complete", async () => {
        const loggedUser = await logIn(adminUser);

        const newActivity = await api
          .post("/api/activities")
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .set("Content-Type", "multipart/form-data")
          .field("name", "Test Activity")
          .field("content", "This is a test.")
          .expect(201);

        await newActivity.destroy();
      }, 100000);
    });
  });
});

describe("PUT /activities/:id", () => {
  test("Fails if user is not logged in", async () => {
    await api.put("/api/activities/1").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await logIn(standardUser);

      await api
        .put("/api/activities/1")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(401);
    }, 100000);

    describe("If user is admin", () => {
      test("Fails if id is invalid", async () => {
        const invalidId = "5a3d5da59070081a82a3445";

        const loggedUser = await logIn(adminUser);

        await api
          .put(`/api/activities/${invalidId}`)
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .expect(400);
      }, 100000);

      test("Succeeds if id is valid", async () => {
        const loggedUser = await logIn(adminUser);

        const newActivity = await api
          .post("/api/activities")
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .set("Content-Type", "multipart/form-data")
          .field("name", "Test Activity")
          .field("content", "This is a test.")
          .expect(201);

        await api
          .put(`/api/activities/${newActivity.id}`)
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .set("Content-Type", "multipart/form-data")
          .field("name", "Actividad de prueba")
          .expect(200)
          .expect("Content-Type", /application\/json/);

        await newActivity.destroy();
      }, 100000);
    });
  });
});

describe("DELETE /activities/:id", () => {
  test("Fails if user is not logged in", async () => {
    await api.delete("/api/activities/1").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await logIn(standardUser);

      await api
        .delete("/api/activities/1")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(401);
    }, 100000);

    describe("If user is admin", () => {
      test("Fails if id is invalid", async () => {
        const invalidId = "5a3d5da59070081a82a3445";

        const loggedUser = await logIn(adminUser);

        await api
          .delete(`/api/activities/${invalidId}`)
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .expect(400);
      }, 100000);

      test("Succeeds if id is valid", async () => {
        const loggedUser = await logIn(adminUser);

        const newActivity = await api
          .post("/api/activities")
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .set("Content-Type", "multipart/form-data")
          .field("name", "Test Activity")
          .field("content", "This is a test.")
          .expect(201);

        await api
          .delete(`/api/activities/${newActivity.id}`)
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .expect(204)
          .expect("Content-Type", /application\/json/);
      }, 100000);
    });
  });
});
