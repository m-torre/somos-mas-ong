const organizationsRouter = require("express").Router();
const {
  getOrganization,
  updateOrganization,
} = require("../controllers/organizations");
const {
  idValidator,
  organizationUpdateDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");
const imageUpload = require("../middleware/imageUpload");

organizationsRouter.get("/:id", idValidator, checkValidator, getOrganization);

organizationsRouter.put(
  "/:id",
  idValidator,
  organizationUpdateDataValidator,
  checkValidator,
  imageUpload,
  updateOrganization
);

module.exports = organizationsRouter;
