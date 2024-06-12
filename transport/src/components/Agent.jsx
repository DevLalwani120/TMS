import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Agent.css';
import { toast } from 'react-toastify';

const Agent = ({ docketno }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !address) {
      toast.error('Please fill in all fields.');
      return;
    }
    
    setLoading(true);

    const clientemail = sessionStorage.getItem('email');
    const formData = {
      docketno,
      name,
      address,
      clientemail
    };

    try {
      const resp = await axios.post('https://tms-server-nt4d.onrender.com/agent', formData);
      toast.success(resp.data.message);
      setIsSubmitted(true);
      setSubmissionMessage('Data submitted. You cannot save another with this GR number.');
      // setName('');
      // setAddress('');
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error(`There was an error! ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='header'>
        <h2 className='agentheading'>Details of Issuing Office or Agent</h2>
      </div>
      <form className='agentdetails'>
        <div className="name">
          <label className="namelabel" htmlFor="name">Name</label>
          <input
            className="nameinput"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
        </div>
        <div className="agentaddress">
          <label className="agentaddresslabel" htmlFor="address">Address</label>
          <input
            className="agentaddressinput"
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            required
          />
        </div>
        <button type="button" className='submit-button' onClick={handleSubmit}disabled={isSubmitted || loading}>
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

export default Agent;
