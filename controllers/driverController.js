const bcrypt = require('bcrypt');
const { pool } = require('../db');
const Joi = require('@hapi/joi');

const registerDriver = async (req, res) => {
    // Validation checks
    const { error } = validateDriver(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map(err => err.message) });
    }

    try {
        const {
            driver_username,
            driver_email,
            driver_password,
            driver_license,
            truck_type,
            production_year,
            plate_number,
            truck_image,
            driver_size_type,
            status,
        } = req.body;

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(driver_password, 10);

        const newDriver = await pool.query(
            'INSERT INTO drivers ( driver_username, driver_email, driver_password, driver_license, truck_type, production_year, plate_number, truck_image, driver_size_type, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [
                // req.user.user_id, // Assuming you have user authentication in place
                driver_username,
                driver_email,
                hashedPassword,
                driver_license,
                truck_type,
                production_year,
                plate_number,
                truck_image,
                driver_size_type,
                status,
            ]
        );

        res.status(201).json({ message: 'Driver registered successfully', data: newDriver.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Joi validation function for driver registration
const validateDriver = (data) => {
    const schema = Joi.object({
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

    return schema.validate(data);
};

module.exports = {
    registerDriver,
};
