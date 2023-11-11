const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const userController = require('../controllers/userController');

// Define Joi schema for input validation
const registrationSchema = Joi.object({
    user_username: Joi.string().required(),
    user_password: Joi.string().min(6).required(),
    user_email: Joi.string().email().required(),
    user_phone_number: Joi.string().required(),
});

// Middleware for input validation
const validateRegistration = (req, res, next) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map(err => err.message) });
    }
    next();
};

// Register user route with input validation middleware
router.post('/register/user', validateRegistration, userController.registerUser);

module.exports = router;
