const usersRouter = require("express").Router();
const { getUsers, updateUser, deleteUser } = require("../controllers/users");
const {
  idValidator,
  userUpdateDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");
const JWTValidator = require("../middleware/JWTValidator");
const isAdmin = require("../middleware/isAdmin");

usersRouter.get("/", JWTValidator, isAdmin, getUsers);

usersRouter.put(
  "/:id",
  idValidator,
  JWTValidator,
  userUpdateDataValidator,
  checkValidator,
  updateUser
);

usersRouter.delete(
  "/:id",
  JWTValidator,
  idValidator,
  checkValidator,
  deleteUser
);

module.exports = usersRouter;
