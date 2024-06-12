const express = require('express');
const router = express.Router();
const db = require('../db');
const argon2 = require('argon2');
const nodemailer = require('nodemailer');

// Setup the email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "demowork7410@gmail.com",
      pass: "pjkb lmto ckbe hyzc",
    },
  });
  

router.post('/addClient', async (req, res) => {
  const {
    owner_name,
    company_name,
    gstin,
    cin,
    ho_address,
    ho_state,
    ho_city,
    ho_pin_code,
    bank_name,
    bank_account_no,
    ifsc,
    branch,
    contact_no,
    invoice_prefix,
    email,
    password,
    bo_address,
    bo_state,
    bo_city,
    bo_pin_code,
    grno,
    packinglistno,
    cashreceiptno,
    additionalreceipt,
  } = req.body;

  const checkEmailQuery = 'SELECT * FROM clientdetails WHERE email = ?';

  try {
    const [existingEmails] = await db.execute(checkEmailQuery, [email]);

    if (existingEmails.length > 0) {
      return res.status(200).send('Email already exists');
    }

    const hashedPassword = await argon2.hash(password);

    const query = `
      INSERT INTO clientdetails (
          owner_name, company_name, gstin, cin, ho_address, ho_state, ho_city, ho_pin_code,
          bank_name, bank_account_no, ifsc, branch, contact_no, invoice_prefix, email, password,
          bo_address, bo_state, bo_city, bo_pin_code,grno,packinglistno,cashreceiptno,additionalreceipt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)
    `;

    const values = [
      owner_name,
      company_name,
      gstin,
      cin,
      ho_address,
      ho_state,
      ho_city,
      ho_pin_code,
      bank_name,
      bank_account_no,
      ifsc,
      branch,
      contact_no,
      invoice_prefix,
      email,
      hashedPassword,
      bo_address,
      bo_state,
      bo_city,
      bo_pin_code,
      grno,
      packinglistno,
      cashreceiptno,
      additionalreceipt,
    ];

    await db.execute(query, values,async (err, results) => {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).send("Server error");
          return;
        }});

    const mailOptions = {
      from: 'demowork7410@gmail.com',
      to: email,
      subject: 'Your Account Details',
      text: `Your account has been created. Your Gmail is: ${email} and your password is: ${password}`,
    };

    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
    res.status(200).send('Client added successfully and Account details Sent via mail');

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
