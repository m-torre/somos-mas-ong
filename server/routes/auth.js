const authRouter = require("express").Router();
const { registerUser, login } = require("../controllers/auth");
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

module.exports = authRouter;
