const express = require('express');
const pool = require('../db');  // Adjust the path if necessary
const argon2 = require('argon2');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    // Check if user already exists
    const [existingUser] = await pool.query('SELECT * FROM adminlogin WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password using argon2
    const hashedPassword = await argon2.hash(password);

    // Insert new user into the database with hashed password
    await pool.query('INSERT INTO adminlogin (name, email, password, phone) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, phone]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
