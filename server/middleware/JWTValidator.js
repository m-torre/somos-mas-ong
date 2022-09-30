const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { JWT_SECRET } = require("../utils/config");

const JWTValidator = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), JWT_SECRET);
    } catch {
      return res.status(401).json({ error: "Token invalid." });
    }
  } else {
    return res.status(401).json({ error: "Token missing." });
  }

  const user = await User.findByPk(req.decodedToken.id);

  if (!user) {
    return res.status(401).json({ error: "Token invalid." });
  }

  req.user = user;

  next();
};

module.exports = JWTValidator;
