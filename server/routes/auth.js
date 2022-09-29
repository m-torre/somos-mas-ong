const authRouter = require("express").Router();
const { registerUser } = require("../controllers/auth");
const {
  userDataValidator,
  checkValidator,
} = require("../middleware/requestBodyValidators");

authRouter.post("/register", userDataValidator, checkValidator, registerUser);

module.exports = authRouter;
