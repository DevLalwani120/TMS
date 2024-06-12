const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getlistno', async (req, res) => {
    try {
        const clientEmail = req.headers.email;
        if (!clientEmail) {
            return res.status(400).json({ error: 'Email header is required' });
        }

        // Query to get the highest packinglistno from biltypackinglist table
        const query = `
            SELECT packinglistno
            FROM biltypackinglist
            WHERE clientemail = ?
            ORDER BY packinglistno DESC
            LIMIT 1
        `;
        const [rows] = await db.execute(query, [clientEmail]);

        let packinglistno;
        if (rows.length === 0) {
            // If no records found in biltypackinglist, get the packinglistno from clientdetails table
            const clientDetailsQuery = `
                SELECT packinglistno
                FROM clientdetails
                WHERE email = ?
            `;
            const [clientDetailsRows] = await db.execute(clientDetailsQuery, [clientEmail]);

            if (clientDetailsRows.length === 0) {
                return res.status(404).json({ error: 'No records found for the provided email' });
            }

            packinglistno = clientDetailsRows[0].packinglistno;

        } else {
            packinglistno = parseInt(rows[0].packinglistno) + 1;
        }


        res.status(200).json({ packinglistno });
    } catch (error) {
        console.error('Error fetching Packing List Number:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
