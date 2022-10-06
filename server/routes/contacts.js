const contactsRouter = require("express").Router();
const { getContacts, createContact } = require("../controllers/contacts");
const {
  contactCreationDataValidator,
  checkValidator,
} = require("../middleware/requestDataValidators");
const JWTValidator = require("../middleware/JWTValidator");
const isAdmin = require("../middleware/isAdmin");

contactsRouter.get("/", JWTValidator, isAdmin, getContacts);

contactsRouter.post(
  "/",
  contactCreationDataValidator,
  checkValidator,
  createContact
);

module.exports = contactsRouter;
