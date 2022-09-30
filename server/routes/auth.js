const authRouter = require("express").Router();
const { registerUser, login, getUserData } = require("../controllers/auth");
const {
  userCreationDataValidator,
  loginDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");

authRouter.post(
  "/register",
  userCreationDataValidator,
  checkValidator,
  registerUser
);

authRouter.post("/login", loginDataValidator, checkValidator, login);

authRouter.get("/me", getUserData);

module.exports = authRouter;
