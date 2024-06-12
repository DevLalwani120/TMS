const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getPincodes', async (req, res) => {
  const city = req.query.city;
  const query = 'SELECT pincode FROM location WHERE city = ?';

  try {
    const [results] = await db.execute(query, [city]);
    res.json(results.map(row => row.pincode));
  } catch (err) {
    console.error('Error fetching pincodes:', err);
    res.status(500).send('Error fetching pincodes');
  }
});

module.exports = router;
