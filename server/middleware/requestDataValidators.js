const { body, param, validationResult } = require("express-validator");

const idValidator = param("id")
  .isInt()
  .withMessage("The ID must be an integer.");

const userCreationDataValidator = [
  body("firstName")
    .exists()
    .withMessage("The firstName field is required in the request.")
    .isAlpha()
    .withMessage("The name must contain only letters.")
    .trim()
    .isLength({ min: 4 })
    .withMessage("The first name must be at least 4 letters long."),

  body("lastName")
    .exists()
    .withMessage("The lastName field is required in the request.")
    .isAlpha()
    .withMessage("The name must contain only letters.")
    .trim()
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
    .isAlpha()
    .withMessage("The name must contain only letters.")
    .trim()
    .isLength({ min: 4 })
    .withMessage("The first name must be at least 4 letters long."),

  body("lastName")
    .optional({ checkFalsy: true })
    .isAlpha()
    .withMessage("The name must contain only letters.")
    .trim()
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

  body("image")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage("The image URL must be a string."),

  body("roleId")
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("The role ID must be an integer."),
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
  checkValidator,
};
