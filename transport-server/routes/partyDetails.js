const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to handle form submission
router.post('/partydetails', async(req, res) => {
  const { name, mobile, address, state, city, pinCode, gstin, clientemail } = req.body;

  console.log('Received data:', req.body); // Log received data

  // Define the SQL query to insert the data
  const sql = `
    INSERT INTO partydetails (name, contact, address, state, city, pinCode, gstin, clientemail)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the query
  try {
    const [results] = await db.execute(sql, [name, mobile, address, state, city, pinCode, gstin, clientemail]);
    console.log('Party details saved successfully:'); // Log success
    res.status(200).send("Party client Successfully created");
  } catch (error) {
    console.error('Error saving party details:', error);
    res.status(500).json({ message: 'Failed to save party details.' });
  }
});


module.exports = router;
