const organizationsRouter = require("express").Router();
const {
  getOrganization,
  updateOrganization,
} = require("../controllers/organizations");
const JWTValidator = require("../middleware/JWTValidator");
const isAdmin = require("../middleware/isAdmin");
const {
  idValidator,
  organizationUpdateDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");
const imageUpload = require("../middleware/imageUpload");

organizationsRouter.get("/:id", idValidator, checkValidator, getOrganization);

organizationsRouter.put(
  "/:id",
  JWTValidator,
  isAdmin,
  idValidator,
  organizationUpdateDataValidator,
  checkValidator,
  imageUpload,
  updateOrganization
);

module.exports = organizationsRouter;
