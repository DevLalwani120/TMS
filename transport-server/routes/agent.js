const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/agent', async (req, res) => {
  try {
    const { name, address, clientemail, docketno } = req.body;

    // Input validation
    if (!name || !address || !clientemail || !docketno) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Additional validation logic could be added here

    const query = 'INSERT INTO agent (agentname, agentaddress, grno, clientemail) VALUES (?, ?, ?, ?)';
    await db.execute(query, [name, address, docketno, clientemail]);

    res.status(200).json({ message: 'Agent data saved successfully!' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

module.exports = router;
