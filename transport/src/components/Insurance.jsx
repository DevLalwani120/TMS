import React, { useState } from 'react';
import '../styles/Insurance.css';
import { toast } from 'react-toastify';

const Insurance = ({ docketno }) => {
  const [company, setCompany] = useState('');
  const [policyNo, setPolicyNo] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [risk, setRisk] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!company || !policyNo || !date || !amount || !risk) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);

    const clientemail = sessionStorage.getItem('email');
    const formData = {
      docketno,
      company,
      policyNo,
      date,
      amount,
      risk,
      clientemail
    };

    try {
      const response = await fetch('https://tms-server-nt4d.onrender.com/insurance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        setIsSubmitted(true);
      setSubmissionMessage('Data submitted. You cannot save another with this GR number.');
        // Clear form
        // setCompany('');
        // setPolicyNo('');
        // setDate('');
        // setAmount('');
        // setRisk('');
      } else {
        toast.error('Failed to save insurance details.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while saving insurance details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='header'>
        <h2 className='insuranceheading'>
          The consignor has stated that he has insured the consignment
        </h2>
      </div>
      <form className='insurancedetails'>
        <div className='company'>
          <label className='companylabel' htmlFor='company'>Company</label>
          <input
            className='companyinput'
            type='text'
            id='company'
            name='company'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder='Enter Company'
            required
          />
        </div>
        <div className='insurancerow1'>
          <div className='insurancecol1'>
            <label className='insurancelabel' htmlFor='policyNo'>Policy No.</label>
            <input
              className='insuranceinput'
              type='number'
              name='policyNo'
              id='policyNo'
              value={policyNo}
              onChange={(e) => setPolicyNo(e.target.value)}
              placeholder='Enter Policy no.'
            />
          </div>
          <div className='insurancecol2'>
            <label className='insurancelabel' htmlFor='dateinput'>Date</label>
            <input
              className='insuranceinput'
              type='date'
              name='date'
              id='dateinput'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className='insurancerow2'>
          <div className='insurancecol3'>
            <label htmlFor='amount' className='insurancelabel'>Amount</label>
            <input
              className='insuranceinput'
              type='number'
              name='amount'
              id='amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='Enter Amount'
            />
          </div>
          <div className='insurancecol4'>
            <label className='insurancelabel' htmlFor='risk'>Risk</label>
            <input
              className='insuranceinput'
              type='text'
              name='risk'
              id='risk'
              value={risk}
              onChange={(e) => setRisk(e.target.value)}
              placeholder='Enter risk'
            />
          </div>
        </div>
        <button type='submit' className='submit-button' onClick={handleSubmit} disabled={isSubmitted || loading}>
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

export default Insurance;
