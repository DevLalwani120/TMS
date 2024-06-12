// adminAuthRoutes.js
const express = require('express');
const pool = require('../db'); // Adjust the path if necessary
const argon2 = require('argon2');

const router = express.Router();

router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM adminlogin WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];

    const match = await argon2.verify(user.password, password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Admin login successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
