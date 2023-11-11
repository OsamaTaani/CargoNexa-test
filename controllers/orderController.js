// controllers/orderController.js
const { pool } = require('../db');

const OrderController = {
  createOrder: async (req, res) => {
    try {
      const {
        name,
        receiver_name,
        shipping_location,
        receiver_location,
        reciving_timestamp,
        shipping_timestamp,
        order_truck_size,
        order_description,
      } = req.body;

      // Validate input data
      if (!name || !receiver_name || !shipping_location || !receiver_location || !reciving_timestamp || !shipping_timestamp || !order_truck_size) {
        return res.status(400).json({ error: 'Incomplete order details' });
      }

      // Create a new order
      const newOrder = await pool.query(
        'INSERT INTO orders (user_id, name, receiver_name, shipping_location, receiver_location, reciving_timestamp, shipping_timestamp, order_truck_size, order_description, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [req.user.user_id, name, receiver_name, shipping_location, receiver_location, reciving_timestamp, shipping_timestamp, order_truck_size, order_description, 'Pending']
      );

      return res.status(201).json({ message: 'Order created successfully', order: newOrder.rows[0] });
    } catch (error) {
      console.error('Error during order creation:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = OrderController;
