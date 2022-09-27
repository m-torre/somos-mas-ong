const Sequelize = require("sequelize");
const { DATABASE_URI } = require("./config");
const logger = require("./logger");

const sequelize = new Sequelize(DATABASE_URI, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection to the database established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  connectToDatabase,
};
