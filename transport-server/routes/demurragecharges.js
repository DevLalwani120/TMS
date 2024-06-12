const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/demurrage', async (req, res) => {
  try {
    const { days, rate, docketno, clientemail } = req.body;

    const query = 'INSERT INTO demurrage_charges (days, rate, grno, clientemail) VALUES (?, ?, ?, ?)';
    await db.execute(query, [days, rate, docketno, clientemail]);

    res.status(200).json({ message: 'Demurrage data successfully saved' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

module.exports = router;
