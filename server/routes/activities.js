const activitiesRouter = require("express").Router();
const {
  getActivities,
  createActivity,
  updateActivity,
} = require("../controllers/activities");
const {
  idValidator,
  activityCreationDataValidator,
  activityUpdateDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");
const JWTValidator = require("../middleware/JWTValidator");
const isAdmin = require("../middleware/isAdmin");
const imageUpload = require("../middleware/imageUpload");

activitiesRouter.get("/", getActivities);

activitiesRouter.post(
  "/",
  JWTValidator,
  isAdmin,
  imageUpload,
  activityCreationDataValidator,
  checkValidator,
  createActivity
);

activitiesRouter.put(
  "/:id",
  JWTValidator,
  isAdmin,
  idValidator,
  checkValidator,
  imageUpload,
  activityUpdateDataValidator,
  checkValidator,
  updateActivity
);

module.exports = activitiesRouter;
