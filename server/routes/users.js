const usersRouter = require("express").Router();
const { getUsers, updateUser } = require("../controllers/users");
const {
  userUpdateDataValidator,
  checkValidator,
} = require("../middleware/requestBodyValidators");

usersRouter.get("/", getUsers);

usersRouter.put("/:id", userUpdateDataValidator, checkValidator, updateUser);

module.exports = usersRouter;
