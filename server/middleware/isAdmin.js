const { Role } = require("../models");

const isAdmin = async (req, res, next) => {
  const adminRole = await Role.findOne({
    where: {
      name: "Admin",
    },
  });

  if (req.user.roleId !== adminRole.id) {
    return res.status(401).json({ error: "The user is not an admin." });
  }

  next();
};

module.exports = isAdmin;
