const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getCities', async (req, res) => {
  try {
    const state = req.query.state;
    const query = 'SELECT DISTINCT city FROM location WHERE state = ? ORDER BY city';
    const [rows] = await db.execute(query, [state]);
    res.json(rows.map(row => row.city));
  } catch (err) {
    console.error('Error fetching cities:', err);
    res.status(500).send('Error fetching cities');
  }
});

module.exports = router;
