const { User } = require("../models");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["firstName", "lastName", "email", "roleId"],
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};
