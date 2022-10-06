const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const standardUser = {
  email: "standard@test.com",
  password: "SomosMas1234",
};

const adminUser = {
  email: "admin@test.com",
  password: "SomosMas1234",
};

const logIn = async (user) => {
  const loggedUser = await api
    .post("/api/auth/login")
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  return loggedUser;
};

module.exports = {
  standardUser,
  adminUser,
  logIn,
};
