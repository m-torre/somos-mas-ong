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

const updateTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByPk(req.params.id);

  if (!testimonial) {
    return res.status(404).json({ error: "Testimonial not found." });
  }

  const updatedTestimonialData = {
    name: req.body.name ? req.body.name : testimonial.name,
    content: req.body.content ? req.body.content : testimonial.content,
  };

  await testimonial.set(updatedTestimonialData);
  const updatedTestimonial = await testimonial.save();

  res.status(200).json(updatedTestimonial);
};

const deleteTestimonial = async (req, res) => {
  const testimonial = await Testimonial.findByPk(req.params.id);

  if (testimonial) {
    await testimonial.destroy();
  }

  res.status(204).end();
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
