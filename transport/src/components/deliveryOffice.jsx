import React, { useState } from 'react';
import '../styles/deliveryForm.css';
import { toast } from 'react-toastify';

const DeliveryForm = ({ docketno }) => {
  const [formData, setFormData] = useState({
    address: '',
    state: '',
    telephone: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    // Form validation
    const { address, state, telephone } = formData;
    if (!address || !state || !telephone) {
      toast.error('Please fill in all fields.');
      return;
    }
    setLoading(true);
    const clientemail = sessionStorage.getItem('email');

    try {
      const response = await fetch('https://tms-server-nt4d.onrender.com/deliveryoffice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, clientemail, docketno }),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        setIsSubmitted(true);
      setSubmissionMessage('Data Submitted. You cannot save another with this GR number.');

        // setFormData({
        //   address: '',
        //   state: '',
        //   telephone: ''
        // });
      } else {
        toast.error('Failed to save information.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while saving information.');
    }
  };

  return (
    <div className="deliverycontainer">
      <form className="deliveryForm">
        <div className="header">
          <h2 className="deliveryheading">Will be delivered at the destination.</h2>
        </div>
        <div>
          <label className="deliverylabel" htmlFor="address">Address</label>
          <input
            className="deliveryaddress"
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Address"
            required
          />
        </div>

        <div className="deliveryrow2">
          <div className="deliverycol1">
            <label className="deliverycol2label" htmlFor="deliverystate">State</label>
            <input
              id="deliverystate"
              className="deliverycol2input"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              required
            />
          </div>
          <div className="deliverycol2">
            <label className="deliverycol2label" htmlFor="tel">Tel</label>
            <input
              id="tel"
              className="deliverycol2input"
              type="text"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Enter telephone"
              required
            />
          </div>
        </div>
        <button type="button" className='submit-button' onClick={handleSubmit} disabled={isSubmitted || loading}>Save</button>
      </form>
      {isSubmitted && (
        <div className="submission-message" style={{ color: 'red', marginTop: '20px' }}>
          {submissionMessage}
        </div>
      )}
    </div>
  );
};

export default DeliveryForm;
