const bcrypt = require("bcrypt");

const getPasswordHash = async (plainTextPassword) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(plainTextPassword, saltRounds);

  return passwordHash;
};

module.exports = {
  getPasswordHash,
};
