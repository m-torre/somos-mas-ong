const { Contact } = require("../models");

const getContacts = async (req, res) => {
  const contacts = await Contact.findAll();

  res.status(200).json(contacts);
};

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
  getContacts,
  createContact,
};
