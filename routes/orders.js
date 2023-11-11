const express = require('express');
const router = express.Router();
const  authenticateUser  = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

router.post('/create/product', authenticateUser, orderController.createOrder);

module.exports = router;
