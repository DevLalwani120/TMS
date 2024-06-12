import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/ledgerForm.css';
require('./Invoice') 

const LedgerForm = () => {
  const [ledgerFormData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    state: '',
    city: '',
    pinCode: '',
    gstin: '',
  });
  const [errors, setErrors] = useState({ gstin: '', mobile: '' });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [pinCodes, setPinCodes] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('https://tms-server-nt4d.onrender.com/getStates');
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
        toast.error('Error fetching states');
      }
    };
    fetchStates();
  }, []);

  const handleStateChange = async (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, state: value }));

    if (value) {
      try {
        const response = await axios.get('https://tms-server-nt4d.onrender.com/getCities', { params: { state: value } });
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        toast.error('Error fetching cities');
      }
    }
  };

  const handleCityChange = async (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, city: value }));

    if (value) {
      try {
        const response = await axios.get('https://tms-server-nt4d.onrender.com/getPinCodes', { params: { city: value } });
        setPinCodes(response.data);
      } catch (error) {
        console.error('Error fetching pin codes:', error);
        toast.error('Error fetching pin codes');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'gstin') {
      if (value.trim() === '') {
        setErrors((prevErrors) => ({ ...prevErrors, gstin: '' }));
      } else {
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstinRegex.test(value)) {
          setErrors((prevErrors) => ({ ...prevErrors, gstin: 'Invalid GSTIN format' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, gstin: '' }));
        }
      }
    }
    if (name === 'mobile') {
      if (value.trim() === '') {
        setErrors((prevErrors) => ({ ...prevErrors, mobile: '' }));
      } else {
        const mobileRegex = /^\d{10}$/; // Regular expression to match a 10-digit number
        if (!mobileRegex.test(value)) {
          setErrors((prevErrors) => ({ ...prevErrors, mobile: 'invalid mobile number' }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, mobile: '' }));
        }
      }
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLedgerSubmit = async (event) => {
    event.preventDefault();

    if (formRef.current.checkValidity()) {
      const clientemail = sessionStorage.getItem('email');
      const dataToSend = { ...ledgerFormData, clientemail };

      try {
        console.log('Sending data:', dataToSend);
        const resp = await axios.post('https://tms-server-nt4d.onrender.com/partydetails', dataToSend);

        toast.success('Party client created successfully!');
        setFormData({
          name: '',
          mobile: '',
          address: '',
          state: '',
          city: '',
          pinCode: '',
          gstin: ''
        });
      } catch (error) {
        console.error('Error occurred:', error);
        toast.error(`There was an error! ${error.response?.data?.message || error.message}`);
      }

    } else {
      formRef.current.reportValidity();
    }
  };

  return (
    <>
      <form className="ledger-form" ref={formRef}>
        <h3 className="ledger-header">Party Details</h3>
        <div className="ledger-form-group">
          <label htmlFor="name" className="ledger-form-label">
            Name<span className="red">*</span>
          </label>
          <input
            className="ledger-form-input"
            type="text"
            name="name"
            id="name"
            value={ledgerFormData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </div>
        <div className="ledger-form-group">
          <label htmlFor="mobile" className="ledger-form-label">
            Mobile<span className="red">*</span>
          </label>
          <input
            className="ledger-form-input"
            type="number"
            name="mobile"
            id="mobile"
            value={ledgerFormData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
          />
        {errors.mobile && <p className="error red">{errors.mobile}</p>}
        </div>
        <div className="ledger-form-group">
          <label htmlFor="address" className="ledger-form-label">
            Address<span className="red">*</span>
          </label>
          <input
            className="ledger-form-input"
            type="text"
            name="address"
            id="address"
            value={ledgerFormData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>
        <div className="ledger-form-group">
          <label htmlFor="state" className="ledger-form-label">
            State<span className="red">*</span>
          </label>
          <select
            className="ledger-form-select"
            name="state"
            id="state"
            value={ledgerFormData.state}
            onChange={handleStateChange}
          >
            <option value="">State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="ledger-form-group">
          <label htmlFor="city" className="ledger-form-label">
            City<span className="red">*</span>
          </label>
          <select
            className="ledger-form-select"
            name="city"
            id="city"
            value={ledgerFormData.city}
            onChange={handleCityChange}
          >
            <option value="">City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="ledger-form-group">
          <label htmlFor="pinCode" className="ledger-form-label">
            Pin Code<span className="red">*</span>
          </label>
          <select
            className="ledger-form-select"
            name="pinCode"
            id="pinCode"
            value={ledgerFormData.pinCode}
            onChange={handleChange}
          >
            <option value="">Pin Code</option>
            {pinCodes.map((pinCode, index) => (
              <option key={index} value={pinCode}>
                {pinCode}
              </option>
            ))}
          </select>
        </div>
        <div className="ledger-form-group">
          <label htmlFor="gstin" className="ledger-form-label">
            GSTIN/Unregistered<span className="red">*</span>
          </label>
          <input
            className="ledger-form-input"
            type="text"
            name="gstin"
            id="gstin"
            value={ledgerFormData.gstin}
            onChange={handleChange}
            placeholder="GSTIN"
          />
          {errors.gstin && <p className="error red">{errors.gstin}</p>}
        </div>
        <button type="button" onClick={handleLedgerSubmit} className="ledger-form-button">
          Add Ledger
        </button>
      </form>
      <ToastContainer 
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={false}
      />
    </>
  );
};

export default LedgerForm;
