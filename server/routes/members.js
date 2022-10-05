const membersRouter = require("express").Router();
const {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/members");
const JWTValidator = require("../middleware/JWTValidator");
const isAdmin = require("../middleware/isAdmin");
const {
  idValidator,
  memberCreationDataValidator,
  memberUpdateDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");
const imageUpload = require("../middleware/imageUpload");

membersRouter.get("/", getMembers);

membersRouter.post(
  "/",
  JWTValidator,
  isAdmin,
  imageUpload,
  memberCreationDataValidator,
  checkValidator,
  createMember
);

membersRouter.put(
  "/:id",
  JWTValidator,
  isAdmin,
  idValidator,
  checkValidator,
  imageUpload,
  memberUpdateDataValidator,
  checkValidator,
  updateMember
);

membersRouter.delete(
  "/:id",
  JWTValidator,
  isAdmin,
  idValidator,
  checkValidator,
  deleteMember
);

module.exports = membersRouter;
