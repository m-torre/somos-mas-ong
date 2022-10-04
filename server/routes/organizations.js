const organizationsRouter = require("express").Router();
const { getOrganization } = require("../controllers/organizations");
const {
  idValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");

organizationsRouter.get("/:id", idValidator, checkValidator, getOrganization);

module.exports = organizationsRouter;
