const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/deliveryoffice', async (req, res) => {
  try {
    const { address, state, telephone, clientemail, docketno } = req.body;

    const query = 'INSERT INTO deiveryoffice (deiveryofficeaddress, deiveryofficestate, deiveryofficetel, clientemail, grno) VALUES (?, ?, ?, ?, ?)';
    await db.execute(query, [address, state, telephone, clientemail, docketno]);

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

module.exports = router;
