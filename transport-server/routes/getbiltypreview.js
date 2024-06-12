const express = require('express');
const router = express.Router();
const db = require('../db');

// Endpoint to get data based on grNO and clientemail
router.get('/getbiltypreview', async (req, res) => {
    const grNo = req.query.grNo;
    const clientemail = req.query.clientemail;
    
    console.log('Received grNo and clientemail:', grNo, clientemail);

    if (!grNo || !clientemail) {
        return res.status(400).json({ error: 'Missing grNo or clientemail' });
    }

    const query = `
        SELECT 
            b.*,
            p.*,
            i.*,
            a.*,
            d.*,
            dc.*
        FROM 
            bilty b
        LEFT JOIN 
            packinglist p ON b.grNo = p.grNo AND b.clientemail = p.clientemail
        LEFT JOIN 
            insurance i ON b.grNo = i.grno AND b.clientemail = i.clientemail
        LEFT JOIN 
            agent a ON b.grNo = a.grno AND b.clientemail = a.clientemail
        LEFT JOIN 
            deiveryoffice d ON b.grNo = d.grno AND b.clientemail = d.clientemail
        LEFT JOIN 
            demurrage_charges dc ON b.grNo = dc.grno AND b.clientemail = dc.clientemail
        WHERE 
            b.grNo = ? AND b.clientemail = ?;
    `;

    try {
        const [results, fields] = await db.execute(query, [grNo, clientemail]);
        console.log('DB Results:', results);
        res.json(results);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
