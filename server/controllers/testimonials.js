const { Testimonial } = require("../models");

const createTestimonial = async (req, res) => {
  const testimonialData = {
    name: req.body.name,
    content: req.body.content,
  };

  const savedTestimonial = await Testimonial.create(testimonialData);
  res.status(201).json(savedTestimonial);
};

module.exports = {
  createTestimonial,
};
