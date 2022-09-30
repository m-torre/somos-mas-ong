const usersRouter = require("express").Router();
const { getUsers, updateUser, deleteUser } = require("../controllers/users");
const {
  idValidator,
  userUpdateDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");

usersRouter.get("/", getUsers);

usersRouter.put(
  "/:id",
  idValidator,
  userUpdateDataValidator,
  checkValidator,
  updateUser
);

usersRouter.delete("/:id", idValidator, checkValidator, deleteUser);

module.exports = usersRouter;
