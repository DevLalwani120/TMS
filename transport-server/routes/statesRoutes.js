const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getStates', async (req, res) => {
  try {
    const query = 'SELECT DISTINCT state FROM location ORDER BY state';
    const [rows] = await db.execute(query);
    res.json(rows.map(row => row.state));
  } catch (err) {
    console.error('Error fetching states:', err);
    res.status(500).send('Error fetching states');
  }
});

module.exports = router;
