const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getcashreceiptdetails', async (req, res) => {
  const clientEmail = req.headers['x-client-email'];

  if (!clientEmail) {
    return res.status(400).json({ message: 'Client email not provided' });
  }

  const sql = `SELECT * FROM cashreceipt WHERE clientemail = ?`;

  try {
    const [results] = await db.execute(sql, [clientEmail]);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching parties:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
