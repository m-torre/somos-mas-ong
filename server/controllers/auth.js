const { User, Role } = require("../models");
const {
  getPasswordHash,
  checkPassword,
} = require("../helpers/passwordEncryption");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

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

  const token = jwt.sign(userForToken, JWT_SECRET, { expiresIn: 60 * 60 });

  res.status(200).json({ token, user: userForToken });
};

const getUserData = async (req, res) => {
  const authorization = req.get("authorization");
  let decodedToken;
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
    } catch {
      res.status(401).json({ error: "Token invalid" });
    }
  } else {
    res.status(401).json({ error: "Token missing" });
  }

  const user = await User.findByPk(decodedToken.id, {
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
