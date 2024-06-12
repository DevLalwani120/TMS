const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getpackinglist/:grNo', async (req, res) => {
  const grNo = req.params.grNo;
console.log(grNo,"packing")
  try {
    const [packingList] = await db.execute('SELECT * FROM packinglist WHERE grNo = ?', [grNo]);
console.log(packingList,"data");
    // Combine billty data with packing list
    const response = {
      packingList: packingList
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching packing data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
