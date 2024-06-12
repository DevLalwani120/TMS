const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/insurance', async (req, res) => {
  try {
    const { docketno, company, policyNo, date, amount, risk, clientemail } = req.body;

    const query = 'INSERT INTO insurance (grno, company, policyNo, insurancedate, insuranceamount, risk, clientemail) VALUES (?, ?, ?, ?, ?, ?, ?)';
    await db.execute(query, [docketno, company, policyNo, date, amount, risk, clientemail]);

    res.status(200).json({ message: 'Insurance details saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

module.exports = router;
