const membersRouter = require("express").Router();
const { createMember } = require("../controllers/members");
const JWTValidator = require("../middleware/JWTValidator");
const isAdmin = require("../middleware/isAdmin");
const {
  memberCreationDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");

membersRouter.post(
  "/",
  JWTValidator,
  isAdmin,
  memberCreationDataValidator,
  checkValidator,
  createMember
);

module.exports = membersRouter;
