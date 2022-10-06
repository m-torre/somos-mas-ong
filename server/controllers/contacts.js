const { Contact } = require("../models");

const createContact = async (req, res) => {
  const contactData = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    message: req.body.message,
  };

  const savedContact = await Contact.create(contactData);
  res.status(201).json(savedContact);
};

module.exports = {
  createContact,
};
