const Sequelize = require("sequelize");
const { DATABASE_URI } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");
const path = require("path");
const logger = require("./logger");

const sequelize = new Sequelize(DATABASE_URI, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: [
        "{migrations/*.js,seeders/*.js}",
        { cwd: path.resolve(__dirname, "../") },
      ],
      resolve: ({ name, path, context }) => {
        const migration = require(path);
        return {
          name,
          up: async () => migration.up(context, Sequelize),
          down: async () => migration.down(context, Sequelize),
        };
      },
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });

  const migrations = await migrator.up();
  logger.info("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    logger.info("Connection to the database established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelize,
  connectToDatabase,
};
