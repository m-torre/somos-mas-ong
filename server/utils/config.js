require("dotenv").config();

const PORT = process.env.PORT || 3001;
const DATABASE_URI = process.env.DATABASE_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || 60 * 60;

module.exports = {
  PORT,
  DATABASE_URI,
  JWT_SECRET,
  JWT_EXPIRATION_TIME,
};
