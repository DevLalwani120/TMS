const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getadditionalreceiptno', async (req, res) => {
    try {
        const clientEmail = req.headers.email;

        const query = `
            SELECT additionalreceiptno
            FROM additionalreceipt
            WHERE clientemail = ?
            ORDER BY additionalreceiptno DESC
            LIMIT 1
        `;
        const [rows] = await db.execute(query, [clientEmail]);

        let additionalreceiptno;
 
        if (rows.length === 0) {
            // If no records found in cashreceipt, get the cashreceiptno from clientdetails table
            const clientDetailsQuery = `
                SELECT additionalreceipt
                FROM clientdetails
                WHERE email = ?
            `;
            const [clientDetailsRows] = await db.execute(clientDetailsQuery, [clientEmail]);

            if (clientDetailsRows.length === 0) {
                return res.status(404).json({ error: 'No records found for the provided email' });
            }

            additionalreceiptno = clientDetailsRows[0].additionalreceipt;

        } else {
            additionalreceiptno = parseInt(rows[0].additionalreceiptno)+1;
        }

        res.status(200).json({ additionalreceiptno });
    } catch (error) {
        console.error('Error fetching cash receipt no:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports=router
