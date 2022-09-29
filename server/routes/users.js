const usersRouter = require("express").Router();
const { getUsers, updateUser, deleteUser } = require("../controllers/users");
const {
  userUpdateDataValidator,
  checkValidator,
} = require("../middleware/requestBodyValidators");
const { param } = require("express-validator");

usersRouter.get("/", getUsers);

usersRouter.put("/:id", userUpdateDataValidator, checkValidator, updateUser);

usersRouter.delete(
  "/:id",
  param("id").isInt().withMessage("The user ID must be an integer."),
  checkValidator,
  deleteUser
);

module.exports = usersRouter;
