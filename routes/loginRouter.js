// routes/loginRouter.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
// const verifyToken = require("../middleware/authMiddleware");

router.post('/login/user', authController.loginUser );
// router.get("/verify_token")
module.exports = router;
