const membersRouter = require("express").Router();
const { getMembers, createMember } = require("../controllers/members");
const JWTValidator = require("../middleware/JWTValidator");
const isAdmin = require("../middleware/isAdmin");
const {
  memberCreationDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");

membersRouter.get("/", getMembers);

membersRouter.post(
  "/",
  JWTValidator,
  isAdmin,
  memberCreationDataValidator,
  checkValidator,
  createMember
);

module.exports = membersRouter;
