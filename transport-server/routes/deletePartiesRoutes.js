// routes/deleteClients.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '7410', 
    database: 'tms'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Delete client route
router.delete('/deleteparty/:id', (req, res) => {
    const partyId = req.params.id;
    const query = 'DELETE FROM partydetails WHERE id = ?';

    db.query(query, [partyId], (err, result) => {
        if (err) {
            console.error('Error deleting client:', err);
            res.status(500).send('Server error');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Client not found');
            return;
        }
        res.status(200).send('Client deleted successfully');
    });
});

module.exports = router;
