const {
  body,
  param,
  buildCheckFunction,
  validationResult,
} = require("express-validator");

const checkFile = buildCheckFunction(["file"]);

const idValidator = param("id")
  .isInt()
  .withMessage("The ID must be an integer.");

const userCreationDataValidator = [
  body("firstName")
    .exists()
    .withMessage("The firstName field is required in the request.")
    .trim()
    .isAlpha("es-ES")
    .withMessage("The name must contain only letters.")
    .isLength({ min: 4 })
    .withMessage("The first name must be at least 4 letters long."),

  body("lastName")
    .exists()
    .withMessage("The lastName field is required in the request.")
    .trim()
    .isAlpha("es-ES")
    .withMessage("The name must contain only letters.")
    .isLength({ min: 4 })
    .withMessage("The last name must be at least 4 letters long."),

  body("email")
    .exists()
    .withMessage("The email field is required in the request.")
    .isEmail()
    .withMessage("The email must have a valid format."),

  body("password")
    .exists()
    .withMessage("The password field is required in the request.")
    .isString()
    .withMessage("The password must be a string.")
    .trim()
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long.")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g)
    .withMessage(
      "The password must have at least one lowercase letter, one uppercase letter and a number."
    ),
];

const userUpdateDataValidator = [
  body("firstName")
    .optional({ checkFalsy: true })
    .trim()
    .isAlpha("es-ES")
    .withMessage("The name must contain only letters.")
    .isLength({ min: 4 })
    .withMessage("The first name must be at least 4 letters long."),

  body("lastName")
    .optional({ checkFalsy: true })
    .trim()
    .isAlpha("es-ES")
    .withMessage("The name must contain only letters.")
    .isLength({ min: 4 })
    .withMessage("The last name must be at least 4 letters long."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("The email must have a valid format."),

  body("password")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("The password must be a string.")
    .trim()
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long.")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/g)
    .withMessage(
      "The password must have at least one lowercase letter, one uppercase letter and a number."
    ),

  body("roleId")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("The role ID must be an integer."),
];

const loginDataValidator = [
  body("email")
    .exists()
    .withMessage("The email field is required in the request.")
    .isEmail()
    .withMessage("The email must have a valid format."),

  body("password")
    .exists()
    .withMessage("The password field is required in the request.")
    .isString()
    .withMessage("The password must be a string.")
    .trim(),
];

const organizationUpdateDataValidator = [
  body("name")
    .optional({ checkFalsy: true })
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("The name must contain only letters.")
    .trim()
    .isLength({ min: 2 })
    .withMessage("The name must be at least 2 letters long."),

  body("email")
    .optional({ checkFalsy: true })
    .isEmail()
    .withMessage("The email must have a valid format."),

  body("phone")
    .optional({ checkFalsy: true })
    .isNumeric()
    .withMessage("The phone must contain only numbers.")
    .trim()
    .isLength({ min: 8 })
    .withMessage("The phone number must be at least 8 digits long."),

  body("FacebookURL")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("The Facebook URL must have a valid format."),

  body("InstagramURL")
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("The Instagram URL must have a valid format."),
];

const memberCreationDataValidator = [
  body("name")
    .exists()
    .withMessage("The name field is required in the request.")
    .trim()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("The name must contain only letters.")
    .isLength({ min: 4 })
    .withMessage("The name must be at least 4 letters long."),

  checkFile().exists().withMessage("The image is required in the request."),

  body("description")
    .exists()
    .withMessage("The description field is required in the request.")
    .isString()
    .withMessage("The description must be a string.")
    .trim()
    .isLength({ min: 4 })
    .withMessage("The description must be at least 4 letters long."),
];

const memberUpdateDataValidator = [
  body("name")
    .optional({ checkFalsy: true })
    .trim()
    .isAlpha("es-ES", { ignore: " " })
    .withMessage("The name must contain only letters.")
    .isLength({ min: 4 })
    .withMessage("The name must be at least 4 letters long."),

  body("description")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("The description must be a string.")
    .trim()
    .isLength({ min: 4 })
    .withMessage("The description must be at least 4 letters long."),
];

const activityCreationDataValidator = [
  body("name")
    .exists()
    .withMessage("The name field is required in the request.")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .withMessage("The name must contain only letters.")
    .isLength({ min: 4 })
    .withMessage("The name must be at least 4 letters long."),

  checkFile().exists().withMessage("The image is required in the request."),

  body("content")
    .exists()
    .withMessage("The content field is required in the request.")
    .isString()
    .withMessage("The content must be a string.")
    .trim()
    .isLength({ min: 4 })
    .withMessage("The content must be at least 4 letters long."),
];

const activityUpdateDataValidator = [
  body("name")
    .optional({ checkFalsy: true })
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .withMessage("The name must contain only letters.")
    .isLength({ min: 4 })
    .withMessage("The name must be at least 4 letters long."),

  body("content")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("The content must be a string.")
    .trim()
    .isLength({ min: 4 })
    .withMessage("The content must be at least 4 letters long."),
];

const newsCreationDataValidator = [
  body("name")
    .exists()
    .withMessage("The name field is required in the request.")
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .withMessage("The name must contain only letters.")
    .isLength({ min: 4 })
    .withMessage("The name must be at least 4 letters long."),

  body("content")
    .exists()
    .withMessage("The content field is required in the request.")
    .isString()
    .withMessage("The content must be a string.")
    .trim()
    .isLength({ min: 4 })
    .withMessage("The content must be at least 4 letters long."),
];

const newsUpdateDataValidator = [
  body("name")
    .optional({ checkFalsy: true })
    .trim()
    .isAlphanumeric("es-ES", { ignore: " " })
    .withMessage("The name must contain only letters.")
    .isLength({ min: 4 })
    .withMessage("The name must be at least 4 letters long."),

  body("content")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("The content must be a string.")
    .trim()
    .isLength({ min: 4 })
    .withMessage("The content must be at least 4 letters long."),
];

const checkValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  idValidator,
  userCreationDataValidator,
  userUpdateDataValidator,
  loginDataValidator,
  organizationUpdateDataValidator,
  memberCreationDataValidator,
  memberUpdateDataValidator,
  activityCreationDataValidator,
  activityUpdateDataValidator,
  newsCreationDataValidator,
  newsUpdateDataValidator,
  checkValidator,
};
