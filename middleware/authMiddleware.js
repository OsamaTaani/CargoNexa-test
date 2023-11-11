// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const secretKey = process.env.SECRET_KEY;
    console.log('Secret Key:', secretKey);
    const decoded = jwt.verify(token, secretKey);

    console.log('Decoded Token:', decoded); // Log the decoded token
    req.user = decoded.user.user;
    next();
  } catch (error) {
    console.error('Error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  verifyToken,
};
