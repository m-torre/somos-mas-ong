const authRouter = require("express").Router();
const { registerUser } = require("../controllers/auth");
const {
  userCreationDataValidator,
  checkValidator,
} = require("../middleware/requestBodyValidators");

authRouter.post(
  "/register",
  userCreationDataValidator,
  checkValidator,
  registerUser
);

module.exports = authRouter;
