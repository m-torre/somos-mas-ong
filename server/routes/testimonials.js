const testimonialsRouter = require("express").Router();
const {
  getTestimonials,
  createTestimonial,
} = require("../controllers/testimonials");
const {
  testimonialCreationDataValidator,
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

module.exports = testimonialsRouter;
