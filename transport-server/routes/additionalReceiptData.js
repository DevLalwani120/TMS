const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/additionalreceipt', async (req, res) => {
  try {
    const {
      videlr,
      grossTotalWords,
      billtyDate,
      from,
      to,
      date,
      receivedFrom,
      freight,
      transportation,
      packing,
      loading,
      unloading,
      unpacking,
      insurance,
      bikeCharges,
      carTransportation,
      gstin,
      total,
      additionalReceiptFor,
      additionalReceiptNo,
      clientEmail
    } = req.body;

  

    // Sanitize input data
    const sanitizedData = {
      videlr: videlr || null,
      grossTotalWords: grossTotalWords || null,
      billtyDate: billtyDate || null,
      from: from || null,
      to: to || null,
      date: date || null,
      receivedFrom: receivedFrom || null,
      freight: freight || null,
      transportation: transportation || null,
      packing: packing || null,
      loading: loading || null,
      unloading: unloading || null,
      unpacking: unpacking || null,
      insurance: insurance || null,
      bikeCharges: bikeCharges || null,
      carTransportation: carTransportation || null,
      gstin: gstin || null,
      total: total || null,
      additionalReceiptFor: additionalReceiptFor || null,
      additionalReceiptNo: additionalReceiptNo || null,
      clientEmail: clientEmail || null
    };

   

    const query = `
      INSERT INTO additionalreceipt (
        grno, clientemail, additionalreceiptno, additionalreceiptdate,
        additionalreceiptreceivedfrom, additionalreceiptrupees,
        additionalreceiptfrom, additionalreceiptto, biltydate, frieght,
        packing, unloading, insurance, cartransportation, loading, unpacking,
        bikecharges, gstin, total, additionalreceiptfor, transportation
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await db.execute(query, [
      sanitizedData.videlr,
      sanitizedData.clientEmail,  // Fixed variable name here
      sanitizedData.additionalReceiptNo,
      sanitizedData.date,
      sanitizedData.receivedFrom,
      sanitizedData.grossTotalWords,  // Fixed variable name here
      sanitizedData.from,
      sanitizedData.to,
      sanitizedData.billtyDate,
      sanitizedData.freight,
      sanitizedData.packing,
      sanitizedData.unloading,
      sanitizedData.insurance,
      sanitizedData.carTransportation,  // Fixed variable name here
      sanitizedData.loading,
      sanitizedData.unpacking,
      sanitizedData.bikeCharges,  // Fixed variable name here
      sanitizedData.gstin,
      sanitizedData.total,
      sanitizedData.additionalReceiptFor,  // Fixed variable name here
      sanitizedData.transportation
    ]);

   

    res.status(200).json({ message: 'Additional cash receipt data successfully saved' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

module.exports = router;
