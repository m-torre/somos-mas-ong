const contactsRouter = require("express").Router();
const { createContact } = require("../controllers/contacts");
const {
  contactCreationDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");

contactsRouter.post(
  "/",
  contactCreationDataValidator,
  checkValidator,
  createContact
);

module.exports = contactsRouter;
