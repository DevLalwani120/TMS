const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/savebillty', async (req, res) => {
    const formData = req.body;
console.log(formData.rows,"rowsdata")
    const values = [
        formData.grNo ?? null,
        formData.inputDate ?? null,
        formData.vehicleno ?? null,
        formData.inputfrom ?? null,
        formData.inputto ?? null,
        formData.frombr ?? null,
        formData.tobr ?? null,
        formData.ConsignorName ?? null,
        formData.consignorAddress ?? null,
        formData.consignoreState ?? null,
        formData.consignorPincode ?? null,
        formData.consignorContact ?? null,
        formData.consignorGstin ?? null,
        formData.ConsigneeName ?? null,
        formData.consigneeAddress ?? null,
        formData.consigneeState ?? null,
        formData.consigneePincode ?? null,
        formData.consigneecontact ?? null,
        formData.consigneeGstin ?? null,
        formData.paymentStatus ?? null,
        formData.rpq ?? null,
        formData.actual ?? null,
        formData.charges ?? null,
        formData.ftl ?? null,
        formData.freight ?? null,
        formData.billityCharge ?? null,
        formData.kanta ?? null,
        formData.labour ?? null,
        formData.amount ?? null,
        formData.gstAmount ?? null,
        formData.gstRate ?? null,
        formData.grossTotal ?? null,
        formData.advance ?? null,
        formData.netPayable ?? null,
        formData.Private ?? null,
        formData.classificationOfGoods ?? null,
        formData.methodofP ?? null,
        formData.invoicenumber ?? null,
        formData.invoicevalue ?? null,
        formData.eway ?? null,
        formData.validdate ?? null,
        formData.GSTPayer ?? null,
        formData.drivername ?? null,
        formData.drivermob ?? null,
        formData.clientEmail ?? null
    ];
    const packingList = formData.rows;
    if (!Array.isArray(packingList)) {
        return res.status(400).json({ message: 'Invalid data format' });
      }
      const packingListsql = 'INSERT INTO packinglist (grNo, clientEmail, packages, description) VALUES (?, ?, ?, ?)';
    const packinglistvalues = packingList.map(item => [
        formData.grNo ?? null,
        formData.clientEmail ?? null,
        item.packages,
        item.description
    ]);

    
    const batchSize = 500; 
    for (let i = 0; i < packinglistvalues.length; i += batchSize) {
        const batch = packinglistvalues.slice(i, i + batchSize);
        for (const value of batch) {
            await db.execute(packingListsql, value);
        }
    }
    const query = `
      INSERT INTO bilty (
          grNo, billtydate, vehicleno, inputfrom, inputto, frombr, tobr, ConsignorName,
          consignorAddress, consignoreState, consignorPincode, consignorContact, consignorGstin, ConsigneeName,
          consigneeAddress, consigneeState, consigneePincode, consigneecontact, consigneeGstin, paymentStatus, rpq, actual, charges, ftl, freight, billityCharge, kanta, labour, amount, gstAmount, gstRate, grossTotal, advance, netPayable, Private, classificationOfGoods, methodofP, invoicenumber, invoicevalue, eway, validdate, GSTPayer, drivername, drivermob, clientEmail
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    try {
        const [result] = await db.execute(query, values);
        res.status(200).json({message:'Bilty saved successfully'});
        
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Server error");
    }
});

module.exports = router;
