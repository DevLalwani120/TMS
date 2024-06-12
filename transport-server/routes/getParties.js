const express = require('express');
const router = express.Router();
const db = require('../db');

// Fetch parties based on session email
router.get('/parties', (req, res) => {

  // Query to fetch party details based on session email
  const query = `SELECT * FROM partydetails WHERE clientemail = ?`;

  connection.query(query, [sessionEmail], (error, results) => {
    if (error) {
      console.error('Error fetching parties:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

module.exports = router;