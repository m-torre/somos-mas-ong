const bcrypt = require("bcrypt");
const { User, Role } = require("../models");

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const emailFound = await User.findOne({
    where: {
      email,
    },
  });

  if (emailFound) {
    return res
      .status(400)
      .json({ error: "The email provided is already in use." });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const standardRole = await Role.findOne({
    where: {
      name: "Standard",
    },
  });

  const user = {
    firstName,
    lastName,
    email,
    passwordHash,
    roleId: standardRole.id,
  };

  try {
    const savedUser = await User.create(user);
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
};
