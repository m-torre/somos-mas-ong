const { User } = require("../models");
const { getPasswordHash } = require("../helpers/passwordEncryption");

const getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "image", "roleId"],
  });

  res.status(200).json(users);
};

const updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const updatedUserData = {
    firstName: req.body.firstName ? req.body.firstName : user.firstName,
    lastName: req.body.lastName ? req.body.lastName : user.lastName,
    email: req.body.email ? req.body.email : user.email,
    image: req.file ? req.file.location : user.image,
    passwordHash: req.body.password
      ? await getPasswordHash(req.body.password)
      : user.passwordHash,
    roleId: req.body.roleId ? req.body.roleId : user.roleId,
  };

  await user.set(updatedUserData);
  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
};

const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    await user.destroy();
  }

  res.status(204).end();
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
};
