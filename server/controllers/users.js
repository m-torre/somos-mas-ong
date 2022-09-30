const { User } = require("../models");
const { getPasswordHash } = require("../helpers/passwordEncryption");

const getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "image", "roleId"],
  });

  res.status(200).json(users);
};

const updateUser = async (req, res) => {
  const userFound = await User.findByPk(req.params.id);

  if (!userFound) {
    return res.status(404).json({ error: "User not found." });
  }

  const updatedUserData = {
    firstName: req.body.firstName ? req.body.firstName : userFound.firstName,
    lastName: req.body.lastName ? req.body.lastName : userFound.lastName,
    email: req.body.email ? req.body.email : userFound.email,
    image: req.body.image ? req.body.image : userFound.image,
    passwordHash: req.body.password
      ? await getPasswordHash(req.body.password)
      : userFound.passwordHash,
    roleId: req.body.roleId ? req.body.roleId : userFound.roleId,
  };

  await userFound.set(updatedUserData);
  const updatedUser = await userFound.save();

  res.status(200).json({ updatedUser });
};

const deleteUser = async (req, res) => {
  const userFound = await User.findByPk(req.params.id);

  if (userFound) {
    await userFound.destroy();
  }

  res.status(204).end();
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
};
