const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/savepackinglist', async (req, res) => {
    const formData = req.body;
    console.log(formData);
    const mainListValues = [
        formData.listNo ?? null,
        formData.email ?? null,
        formData.docketno ?? null,
        formData.from ?? null,
        formData.to ?? null,
        formData.consignorName ?? null,
        formData.consigneeName ?? null,
        formData.date ?? null,
        // Add more fields as needed for the main packing list table
    ];

    // Extracting data for the packing list details table
    const packingList = formData.rows;
    if (!Array.isArray(packingList)) {
        return res.status(400).json({ message: 'Invalid data format for packing list rows' });
    }

    const packingListSql = 'INSERT INTO biltypackinglistdetails (packinglistno, clientemail, grNo, markaNo, particulars, value) VALUES (?, ?, ?, ?, ?, ?)';
    const packingListValues = packingList.map(item => [
        formData.listNo ?? null,
        formData.email ?? null,
        formData.docketno ?? null,
        item.markaNo ?? null,
        item.particulars ?? null,
        item.value ?? null,
    ]);

    const batchSize = 500; 
    for (let i = 0; i < packingListValues.length; i += batchSize) {
        const batch = packingListValues.slice(i, i + batchSize);
        for (const value of batch) {
            await db.execute(packingListSql, value);
        }
    }
    // Insert data for the main packing list table
    const mainListSql = 'INSERT INTO biltypackinglist (packinglistno, clientemail, grNo, fromlocation, tolocation, consignor, consignee, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        const [result] = await db.execute(mainListSql, mainListValues);
        res.status(200).json({message:'Packing List saved successfully'});
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
