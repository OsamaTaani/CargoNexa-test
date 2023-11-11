const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const driverController = require('../controllers/driverController');

// Joi schema for driver registration
const driverSchema = Joi.object({
    driver_username: Joi.string().required(),
    driver_email: Joi.string().email().required(),
    driver_password: Joi.string().min(6).required(),
    driver_license: Joi.string().max(8).required(),
    truck_type: Joi.string().required(),
    production_year: Joi.number().integer().required(),
    plate_number: Joi.string().max(20).required(),
    truck_image: Joi.string(),
    driver_size_type: Joi.string().required(),
    status: Joi.string().required(),
});

// Middleware for input validation
const validateDriverRegistration = (req, res, next) => {
    const { error } = driverSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map(err => err.message) });
    }
    next();
};

// Register driver route with input validation middleware
router.post('/register/driver', validateDriverRegistration, driverController.registerDriver);

module.exports = router;
