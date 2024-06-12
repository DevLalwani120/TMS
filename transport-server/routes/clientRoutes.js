const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming db connection is exported from db.js

router.get("/getClients", async (req, res) => {
  try {
    const query = "SELECT * FROM clientdetails";
    const [rows] = await db.query(query);
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
