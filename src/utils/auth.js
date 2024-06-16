const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

exports.generateToken = (user) => {
    return jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
  };