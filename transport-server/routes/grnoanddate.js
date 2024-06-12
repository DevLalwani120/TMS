const express = require('express');
const router = express.Router();
const moment = require('moment');
const db = require('../db');

router.get('/getGrnoAndBilltyDate', async (req, res) => {
    try {
        const clientEmail = req.headers.email;

        // Query to get the highest grno and associated billtydate from billtydata table
        const query = `
            SELECT grNo, billtydate
            FROM bilty
            WHERE clientemail = ?
            ORDER BY grNo DESC
            LIMIT 1
        `;
        const [rows] = await db.execute(query, [clientEmail]);

        let grno;
        let billtydate;
        if (rows.length === 0) {
            // If no records found in billtydata, get the grno from clientdetails table
            const clientDetailsQuery = `
                SELECT grno
                FROM clientdetails
                WHERE email = ?
            `;
            const [clientDetailsRows] = await db.execute(clientDetailsQuery, [clientEmail]);

            if (clientDetailsRows.length === 0) {
                return res.status(404).json({ error: 'No records found for the provided email' });
            }

            grno = clientDetailsRows[0].grno;
            billtydate = clientDetailsRows[0].billtydate;

        } else {
            grno = parseInt(rows[0].grNo)+1;
            billtydate = rows[0].billtydate;

        
        }

        res.status(200).json({ grno, billtydate });
    } catch (error) {
        console.error('Error fetching GR number and billtydate:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports=router
