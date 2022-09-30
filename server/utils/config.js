require("dotenv").config();

const PORT = process.env.PORT || 3001;
const DATABASE_URI = process.env.DATABASE_URI;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  PORT,
  DATABASE_URI,
  JWT_SECRET,
};
