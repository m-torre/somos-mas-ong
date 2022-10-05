const testimonialsRouter = require("express").Router();
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonials");
const {
  idValidator,
  testimonialCreationDataValidator,
  testimonialUpdateDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");
const JWTValidator = require("../middleware/JWTValidator");
const isAdmin = require("../middleware/isAdmin");

testimonialsRouter.get("/", getTestimonials);

testimonialsRouter.post(
  "/",
  JWTValidator,
  isAdmin,
  testimonialCreationDataValidator,
  checkValidator,
  createTestimonial
);

testimonialsRouter.put(
  "/:id",
  JWTValidator,
  isAdmin,
  idValidator,
  testimonialUpdateDataValidator,
  checkValidator,
  updateTestimonial
);

testimonialsRouter.delete(
  "/:id",
  JWTValidator,
  isAdmin,
  idValidator,
  checkValidator,
  deleteTestimonial
);

module.exports = testimonialsRouter;
