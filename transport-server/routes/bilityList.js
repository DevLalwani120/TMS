const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming db connection is exported from db.js

router.get("/billtyList", async (req, res) => {
  try {
    const clientemail =req.headers.email
    const query = `SELECT * FROM bilty WHERE clientemail = ?`;
    const [results] = await db.execute(query, [clientemail]);
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
