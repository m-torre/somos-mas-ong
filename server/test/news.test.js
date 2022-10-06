const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const News = require("../models").News;
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

describe("GET /news", () => {
  test("Succeeds when user is not logged in", async () => {
    await api
      .get("/api/news")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);
});

describe("POST /news", () => {
  test("Fails if user is not logged in", async () => {
    await api.post("/api/news").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await logIn(standardUser);

      await api
        .post("/api/news")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(401);
    }, 100000);

    describe("If user is admin", () => {
      test("Fails if required content is not complete", async () => {
        const loggedUser = await logIn(adminUser);

        await api
          .post("/api/news")
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .set("Content-Type", "multipart/form-data")
          .field("name", "Test News")
          .expect(400);
      }, 100000);

      test("Succeeds if required content is complete", async () => {
        const loggedUser = await logIn(adminUser);

        const newNews = await api
          .post("/api/news")
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .set("Content-Type", "multipart/form-data")
          .field("name", "Test News")
          .field("content", "This is a test.")
          .expect(201);

        await newNews.destroy();
      }, 100000);
    });
  });
});

describe("PUT /news/:id", () => {
  test("Fails if user is not logged in", async () => {
    await api.put("/api/news/1").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await logIn(standardUser);

      await api
        .put("/api/news/1")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(401);
    }, 100000);

    describe("If user is admin", () => {
      test("Fails if id is invalid", async () => {
        const invalidId = "5a3d5da59070081a82a3445";

        const loggedUser = await logIn(adminUser);

        await api
          .put(`/api/news/${invalidId}`)
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .expect(400);
      }, 100000);

      test("Succeeds if id is valid", async () => {
        const loggedUser = await logIn(adminUser);

        const newNews = await api
          .post("/api/news")
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .set("Content-Type", "multipart/form-data")
          .field("name", "Test News")
          .field("content", "This is a test.")
          .expect(201);

        await api
          .put(`/api/news/${newNews.id}`)
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .set("Content-Type", "multipart/form-data")
          .field("name", "Noticia de prueba")
          .expect(200)
          .expect("Content-Type", /application\/json/);

        await newNews.destroy();
      }, 100000);
    });
  });
});

describe("DELETE /news/:id", () => {
  test("Fails if user is not logged in", async () => {
    await api.delete("/api/news/1").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails if user is not admin", async () => {
      const loggedUser = await logIn(standardUser);

      await api
        .delete("/api/news/1")
        .set("Authorization", `Bearer ${loggedUser.body.token}`)
        .expect(401);
    }, 100000);

    describe("If user is admin", () => {
      test("Fails if id is invalid", async () => {
        const invalidId = "5a3d5da59070081a82a3445";

        const loggedUser = await logIn(adminUser);

        await api
          .delete(`/api/news/${invalidId}`)
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .expect(400);
      }, 100000);

      test("Succeeds if id is valid", async () => {
        const loggedUser = await logIn(adminUser);

        const newNews = await api
          .post("/api/news")
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .set("Content-Type", "multipart/form-data")
          .field("name", "Test News")
          .field("content", "This is a test.")
          .expect(201);

        await api
          .delete(`/api/news/${newNews.id}`)
          .set("Authorization", `Bearer ${loggedUser.body.token}`)
          .expect(204)
          .expect("Content-Type", /application\/json/);
      }, 100000);
    });
  });
});
