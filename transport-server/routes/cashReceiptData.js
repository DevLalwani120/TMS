const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/cashreceipt', async (req, res) => {
  try {
    const {
      docketno,
      grossTotal,
      billtyDate,
      from,
      to,
      cashReceiptNo,
      date,
      receivedFrom,
      branch,
      packages,
      cashOrChequeNo,
      billNo,
      forWhat,
      clientemail
    } = req.body;

    const query = 'INSERT INTO cashreceipt (cashreceiptno, clientemail, billtyDate, cashreceiptfrom, cashreceiptto, cashreceiptdate, receivedFrom, cashreceiptbranch, packages , cashOrChequeNo, billNo, grno, grossTotal, cashreceiptfor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await db.execute(query, [
      cashReceiptNo,
      clientemail,
      billtyDate,
      from,
      to,
      date,
      receivedFrom,
      branch,
      packages,
      cashOrChequeNo,
      billNo,
      docketno,
      grossTotal,
      forWhat
    ]);

    res.status(200).json({ message: 'Cash receipt data successfully saved' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

module.exports = router;
