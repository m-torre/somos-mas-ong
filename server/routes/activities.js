const activitiesRouter = require("express").Router();
const { createActivity } = require("../controllers/activities");
const {
  activityCreationDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");
const JWTValidator = require("../middleware/JWTValidator");
const isAdmin = require("../middleware/isAdmin");
const imageUpload = require("../middleware/imageUpload");

activitiesRouter.post(
  "/",
  JWTValidator,
  isAdmin,
  imageUpload,
  activityCreationDataValidator,
  checkValidator,
  createActivity
);

module.exports = activitiesRouter;
