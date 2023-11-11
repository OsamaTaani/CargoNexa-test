// routes/protectedRoute.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
