const express = require('express');
const router = express.Router();
const db = require('../db');

// Endpoint to get data based on grNO and clientemail
router.get('/getadditionalcashreceiptpreview', async (req, res) => {
    const grNo = req.query.grNo;
    const clientemail = req.query.clientemail;
    
    console.log('Received grNo and clientemail:', grNo, clientemail);

    if (!grNo || !clientemail) {
        return res.status(400).json({ error: 'Missing grNo or clientemail' });
    }

    const query = `SELECT * FROM additionalreceipt WHERE grno = ? AND clientemail = ?;`;

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
