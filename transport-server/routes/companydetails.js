const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/companydetails', async (req, res) => {
    try {
        const clientemail = req.headers.email;

        if (!clientemail) {
            return res.status(400).json({ error: 'Email header is missing' });
        }

        const query = `
            SELECT *
            FROM clientdetails
            WHERE email = ?
        `;

        const [rows] = await db.execute(query, [clientemail]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No company details found' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
