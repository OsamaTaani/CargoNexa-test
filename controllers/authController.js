// controllers/authController.js
const { pool } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  const secretKey = process.env.SECRET_KEY; // Replace with a secure secret key
  return jwt.sign({ user }, secretKey, { expiresIn: '24h' });
};

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const user = await pool.query(
      'SELECT * FROM users WHERE user_email = $1 AND user_password = $2',
      [user_email, user_password]
    );

    if (user.rows.length === 0) {
      res.status(401).json({ message: 'Invalid credentials' });
    } else {
      const token = generateToken({
        user_id: user.rows[0].user_id,
        user_email: user.rows[0].user_email,
      });
      res.status(200).json({ message: 'Login successful', token });
    //   res.json({token});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  loginUser,
  generateToken,
};
