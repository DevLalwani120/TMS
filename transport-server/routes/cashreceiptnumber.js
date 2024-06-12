const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/getcashreceiptnumber', async (req, res) => {
    try {
        const clientEmail = req.headers.email;

        
        const query = `
            SELECT cashreceiptno
            FROM cashreceipt
            WHERE clientemail = ?
            ORDER BY cashreceiptno DESC
            LIMIT 1
        `;
        const [rows] = await db.execute(query, [clientEmail]);

        let cashreceiptno;
 
        if (rows.length === 0) {
            // If no records found in cashreceipt, get the cashreceiptno from clientdetails table
            const clientDetailsQuery = `
                SELECT cashreceiptno
                FROM clientdetails
                WHERE email = ?
            `;
            const [clientDetailsRows] = await db.execute(clientDetailsQuery, [clientEmail]);

            if (clientDetailsRows.length === 0) {
                return res.status(404).json({ error: 'No records found for the provided email' });
            }

            cashreceiptno = clientDetailsRows[0].cashreceiptno;

        } else {
            cashreceiptno = parseInt(rows[0].cashreceiptno)+1;
        }

        res.status(200).json({ cashreceiptno });
    } catch (error) {
        console.error('Error fetching cash receipt no:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports=router
