const bcrypt = require("bcrypt");

const getPasswordHash = async (plainTextPassword) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(plainTextPassword, saltRounds);

  return passwordHash;
};

const checkPassword = async (plainTextPassword, passwordHash) => {
  const result = bcrypt.compare(plainTextPassword, passwordHash);

  return result;
};

module.exports = {
  getPasswordHash,
  checkPassword,
};
