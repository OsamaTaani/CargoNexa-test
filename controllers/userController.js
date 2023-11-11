const bcrypt = require('bcrypt');
const { pool } = require('../db');

const registerUser = async (req, res) => {
    try {
        const { user_username, user_password, user_email, user_phone_number } = req.body;

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(user_password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (user_username, user_password, user_email, user_phone_number) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_username, hashedPassword, user_email, user_phone_number]
        );

        res.status(201).json({ message: 'User registered successfully', data: newUser.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    registerUser,
};
