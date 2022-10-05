const { Testimonial } = require("../models");

const getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.findAll({
    attributes: ["id", "name", "content"],
  });

  res.status(200).json(testimonials);
};

const createTestimonial = async (req, res) => {
  const testimonialData = {
    name: req.body.name,
    content: req.body.content,
  };

  const savedTestimonial = await Testimonial.create(testimonialData);
  res.status(201).json(savedTestimonial);
};

module.exports = {
  getTestimonials,
  createTestimonial,
};
