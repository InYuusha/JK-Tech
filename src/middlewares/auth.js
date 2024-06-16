const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const authenticateUser = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  token = token.split('Bearer ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authorization denied. Invalid token.' });
  }
};

module.exports = authenticateUser;
