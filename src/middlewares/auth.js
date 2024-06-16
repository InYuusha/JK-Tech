const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { AuthenticationError } = require("../utils/error_handling");

const authenticateUser = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    throw new AuthenticationError("Authorization denied. No token provided.");
  }
  token = token.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    throw new AuthenticationError("Authorization denied. Invalid token.");
  }
};

module.exports = authenticateUser;
