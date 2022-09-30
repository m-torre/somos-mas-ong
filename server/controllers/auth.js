const { User, Role } = require("../models");
const {
  getPasswordHash,
  checkPassword,
} = require("../helpers/passwordEncryption");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_TIME } = require("../utils/config");

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

  const passwordHash = await getPasswordHash(password);

  const standardRole = await Role.findOne({
    where: {
      name: "Standard",
    },
  });

  const userData = {
    firstName,
    lastName,
    email,
    passwordHash,
    roleId: standardRole.id,
  };

  const savedUser = await User.create(userData);

  const userForToken = {
    id: savedUser.id,
    email: savedUser.email,
    firstName: savedUser.firstName,
    lastName: savedUser.lastName,
    role: {
      name: standardRole.name,
    },
  };

  const token = jwt.sign(userForToken, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  res.status(201).json({ token, user: userForToken });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
    include: {
      model: Role,
      as: "role",
      attributes: ["name"],
    },
  });

  const passwordCorrect =
    user === null ? false : await checkPassword(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const userForToken = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };

  const token = jwt.sign(userForToken, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  res.status(200).json({ token, user: userForToken });
};

const getUserData = async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id, {
    attributes: {
      exclude: [
        "passwordHash",
        "roleId",
        "deletedAt",
        "createdAt",
        "updatedAt",
      ],
    },
    include: {
      model: Role,
      as: "role",
      attributes: ["name"],
    },
  });

  res.status(200).json({ user });
};

module.exports = {
  registerUser,
  login,
  getUserData,
};
