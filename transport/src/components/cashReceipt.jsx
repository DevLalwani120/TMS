import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/cashReceipt.css';
import numberToWords from '@jstb/num-to-words-indian';
import { toast } from 'react-toastify';

const CashReceipt = ({ docketno, grossTotal, billtyDate, from, to }) => {
  const grossTotalwords = numberToWords(grossTotal) + ' rupees only';
  const [companyDetails, setCompanyDetails] = useState({});
  const [cashReceiptNo, setCashReceiptNo] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    receivedFrom: '',
    branch: '',
    packages: '',
    cashOrChequeNo: '',
    billNo: '',
    forWhat: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = sessionStorage.getItem('email');
        const response = await axios.get('https://tms-server-nt4d.onrender.com/companydetails', {
          headers: { 'email': email }
        });
        setCompanyDetails(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCashReceiptNo = async () => {
      try {
        const email = sessionStorage.getItem('email');
        if (!email) throw new Error('Email is not available in session storage');

        const response = await axios.get('https://tms-server-nt4d.onrender.com/getcashreceiptnumber', {
          headers: { 'email': email }
        });
        setCashReceiptNo(response.data.cashreceiptno);
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCashReceiptNo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    const { date, receivedFrom, branch, packages, cashOrChequeNo, billNo, forWhat } = formData;
    if (!date || !receivedFrom || !branch || !packages || !cashOrChequeNo || !billNo || !forWhat) {
      toast.error('Please fill all the fields.');
      return;
    }

    setLoading(true);

    const clientemail = sessionStorage.getItem('email');
    const dataToSend = {
      docketno,
      grossTotal,
      billtyDate,
      from,
      to,
      cashReceiptNo,
      ...formData,
      clientemail
    };

    try {
      const response = await axios.post('https://tms-server-nt4d.onrender.com/cashreceipt', dataToSend);
      toast.success(response.data.message);
      setIsSubmitted(true);
      setSubmissionMessage('Cash receipt submitted. You cannot save another with this GR number. Please reload.');
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Failed to create cash receipt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="head-cashreceipt">
        <div className="top-cashreceipt">
          <h3 className='upperdata'>GST: {companyDetails.gstin}</h3>
          <h3 className='upperdata'>CASH RECEIPT</h3>
        </div>
      </div>
      <form>
        <div className="row-cashreceipt row1-cashreceipt">
          <h3 className='receiptno'>Receipt Number: <input type="number" className="input-cashreceipt" value={cashReceiptNo} disabled /></h3>
          <h3 className='cashreceiptdate'>Date: <input type="date" className="input-cashreceipt" name="date" value={formData.date} onChange={handleChange} required /></h3>
        </div>
        <div className="row-cashreceipt row2-cashreceipt">
          <h3>Received with thanks from Mr./Mrs: <input type="text" className="input-cashreceipt" name="receivedFrom" value={formData.receivedFrom} onChange={handleChange} required /></h3>
        </div>
        <div className="row-cashreceipt row3-cashreceipt">
          <h3 className='fromcashreceipt'>From: <input type="text" className="input-cashreceipt" value={from} readOnly /></h3>
          <h3 className='tocashreceipt'>To: <input type="text" className="input-cashreceipt" value={to} readOnly /></h3>
          <h3 className='branchcashreceipt'>Branch: <input type="text" className="input-cashreceipt" name="branch" value={formData.branch} onChange={handleChange} required /></h3>
        </div>
        <div className="row-cashreceipt row4-cashreceipt">
          <h3>GrNo.: <input type="number" className="input-cashreceipt" value={docketno} disabled /></h3>
          <h3>Date: <input type="date" className="input-cashreceipt" value={billtyDate} disabled /></h3>
          <h3>Packages: <input type="text" className="input-cashreceipt" name="packages" value={formData.packages} onChange={handleChange} required /></h3>
        </div>
        <div className="row-cashreceipt row5-cashreceipt">
          <h3>Cash/Cheque Number: <input type="text" className="input-cashreceipt" name="cashOrChequeNo" value={formData.cashOrChequeNo} onChange={handleChange} required /></h3>
          <h3>Bill Number: <input type="number" className="input-cashreceipt" name="billNo" value={formData.billNo} onChange={handleChange} required /></h3>
        </div>
        <div className="row-cashreceipt row6-cashreceipt">
          <h3 className='rsfigure'>Rupees: <input type="text" className="input-cashreceipt" value={grossTotalwords} disabled /></h3>
        </div>
        <div className="row-cashreceipt row7-cashreceipt">
          <h3 className='rupee'>
            <svg className="svg-cashreceipt" fill="#000000" width="20px" height="20px" viewBox="-96 0 512 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path>
            </svg>
            <input type="number" className="input-cashreceipt rsinput" value={grossTotal} disabled />
          </h3>
          <h3 className='for'>For: <input type="text" className="input-cashreceipt" name="forWhat" value={formData.forWhat} onChange={handleChange} required /></h3>
        </div>
        <div className="row8-cashreceipt">
          <h3 className="manager">Manager</h3>
        </div>
        <button type="button" className='submit-button' onClick={handleSubmit} disabled={isSubmitted || loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
      {isSubmitted && (
        <div className="submission-message" style={{ color: 'red', marginTop: '20px' }}>
          {submissionMessage}
        </div>
      )}
    </div>
  );
};

export default CashReceipt;
