import React, { useState } from 'react';
import axios from 'axios';
import '../styles/demurrageCharges.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DemurrageCharges = ({ docketno }) => {
  const [days, setDays] = useState('');
  const [rate, setRate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!days || !rate) {
      toast.error('Please enter days and rate.');
      return;
    }

    setLoading(true);


    try {
      const clientemail = sessionStorage.getItem('email');
      const formData = { days, rate, docketno, clientemail };
      const response = await axios.post('https://tms-server-nt4d.onrender.com/demurrage', formData);
      toast.success(response.data.message);
      setIsSubmitted(true);
      setSubmissionMessage('Data submitted. You cannot save another with this GR number.');
      // setDays('');
      // setRate('');
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error(`There was an error! ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demurrage-container">
      <div className="header">
        <h2 className='demurrageheading'>Schedule of Demurrage Charges</h2>
      </div>
      <form>
        <h2 className='demcontent'>
          Demurrage Chargeable after 
          <input
            type="number"
            className="dem"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            placeholder="Days"
            required
          /> 
          days from today @ Rs. 
          <input
            type="number"
            className="dem"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Rate"
            required
          /> 
          per day per Qtl. on weight charged.
        </h2>
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

export default DemurrageCharges;
