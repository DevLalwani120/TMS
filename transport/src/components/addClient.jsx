import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../styles/addClient.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const AddClient = () => {
  const [additionalAddress, setAdditionalAddress] = useState(false);
  const [formData, setFormData] = useState({
    owner_name: '',
    company_name: '',
    gstin: '',
    cin: '',
    ho_address: '',
    ho_state: '',
    ho_city: '',
    ho_pin_code: '',
    bank_name: '',
    bank_account_no: '',
    ifsc: '',
    branch: '',
    contact_no: '',
    invoice_prefix: '',
    email: '',
    password: '',
    bo_address: '',
    bo_state: '',
    bo_city: '',
    bo_pin_code: '',
    additionalreceipt:'',
    cashreceiptno:'',
    packinglistno:'',
    grno:''
  });
  const [errors, setErrors] = useState({ gstin: '' });
  const [cerrors, csetErrors] = useState({ cin: '' });
  const [ifscmsg, setmsg] = useState({ ifsc: '' })
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [pinCodes, setPinCodes] = useState([]);
  const [bocities, setBoCities] = useState([]);
  const [bopinCodes, setBoPinCodes] = useState([]);
  const [emailmsg, setEmailMsg] = useState({ email: '' })

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'ho_state' && value) {
      try {
        const response = await axios.get('https://tms-server-nt4d.onrender.com/getCities', { params: { state: value } });
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        toast.error('Error fetching cities');
      }
    }
  };
  const handleBranchStateChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'bo_state' && value) {
      try {
        const response = await axios.get('https://tms-server-nt4d.onrender.com/getCities', { params: { state: value } });
        setBoCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
        toast.error('Error fetching cities');
      }
    }
  };

  const handleCityChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, ho_city: value });
  
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
  const handleBranchCityChange = async (e) => {
    const { value } = e.target;
    setFormData({ ...formData, bo_city: value });
  
    if (value) {
      try {
        const response = await axios.get('https://tms-server-nt4d.onrender.com/getPinCodes', { params: { city: value } });
        setBoPinCodes(response.data);
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
        setErrors({ ...errors, gstin: '' });
      } else {
        const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!gstinRegex.test(value)) {
          setErrors({ ...errors, gstin: 'Invalid GSTIN format' });
        } else {
          setErrors({ ...errors, gstin: '' });
        }
      }
    }
    if (name === 'cin') {
      if (value.trim() === '') {
        csetErrors({ ...cerrors, cin: '' });
      } else {
        const cinRegex = /^([LUu]{1})([0-9]{5})([A-Za-z]{2})([0-9]{4})([A-Za-z]{3})([0-9]{6})$/;

        if (!cinRegex.test(value)) {
          csetErrors({ ...cerrors, cin: 'Invalid CIN format' });
        } else {
          csetErrors({ ...cerrors, cin: '' });
        }
      }
    }

    if (name === 'ifsc') {
      if (value.trim() === '') {
        setmsg({ ...cerrors, ifsc: '' });
      } else {
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (!ifscRegex.test(value)) {
          setmsg({ ...ifscmsg, ifsc: 'Invalid IFSC format' });
        } else {
          setmsg({ ...ifscmsg, ifsc: '' });
        }
      }
    }
    if (name === 'email') {
      if (value.trim() === '') {
        setEmailMsg({ ...emailmsg, email: '' });
      } else {
        const emailRegex = /^[a-zA-Z0-9_%-]+@[a-zA-Z0-9.-]+\.(com|in)$/;


        if (!emailRegex.test(value)) {
          setEmailMsg({ ...emailmsg, email: 'Invalid Email format' });
        } else {
          setEmailMsg({ ...emailmsg, email: '' });
        }
      }
    }


    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      toast.success("Please Wait");
      const response = await axios.post('https://tms-server-nt4d.onrender.com/addClient', formData);
      toast.dismiss();
      if (response.data ==='Email already exists'){
        toast.error(response.data);
        setFormData({ ...formData,email:''})}
      else{
        toast.success(response.data);
      setFormData({
        owner_name: '',
        company_name: '',
        gstin: '',
        cin: '',
        ho_address: '',
        ho_state: '',
        ho_city: '',
        ho_pin_code: '',
        bank_name: '',
        bank_account_no: '',
        ifsc: '',
        branch: '',
        contact_no: '',
        invoice_prefix: '',
        email: '',
        password: '',
        bo_address: '',
        bo_state: '',
        bo_city: '',
        bo_pin_code: '',
        additionalreceipt:'',
        cashreceiptno:'',
        packinglistno:'',
        grno:''
      });}

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    }
  };

  const additionalAddressHandler = () => {
    setAdditionalAddress(!additionalAddress);
  };

  return (
    <div className="addclientcontainer">
      <form className="addclientform" onSubmit={handleSubmit}>
        <span className="para-heading">Company Details</span>
        <div className="row1">
          <label htmlFor="owner_name">Owner Name<span className="red">*</span></label>
          <input className="addClientInput" type="text" id="owner_name" name="owner_name" placeholder="Enter Owner Name" value={formData.owner_name} onChange={handleChange} required />

          <label htmlFor="company_name">Company Name<span className="red">*</span></label>
          <input className="addClientInput" type="text" id="company_name" name="company_name" placeholder="Enter Company Name" value={formData.company_name} onChange={handleChange} required />

          <label htmlFor="gstin">GSTIN<span className="red">*</span></label>
          <input className="addClientInput" type="text" id="gstin" name="gstin" placeholder="Enter GSTIN" value={formData.gstin} onChange={handleChange} required />

          <label htmlFor="cin">CIN (if Applicable)<span className="red">*</span></label>
          <input className="addClientInput" type="text" id="cin" name="cin" placeholder="Enter CIN" value={formData.cin} onChange={handleChange} />
          {errors.gstin && <p className="error red">{errors.gstin}</p>}
          {cerrors.cin && <p className="error red">{cerrors.cin}</p>}
        </div>
        <span className="para-heading">Head Office Details</span>
        <div className="row2">
          <label htmlFor="ho_address">Address<span className="red">*</span></label>
          <input className="addClientInput" type="text" id="ho_address" name="ho_address" placeholder="Enter Address" value={formData.ho_address} onChange={handleChange} required />

          <label htmlFor="ho_state">State<span className="red">*</span></label>
          <select className="addClientInput" id="ho_state" name="ho_state" value={formData.ho_state} onChange={handleStateChange} required>
            <option value="">Select State</option>
            {states.length > 0 ? (
              states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))
            ) : (
              <option value="" disabled>Loading states...</option>
            )}
          </select>

          <label htmlFor="ho_city">City<span className="red">*</span></label>
          <select className="addClientInput" id="ho_city" name="ho_city" value={formData.ho_city} onChange={handleCityChange} required>
            <option value="">Select City</option>
            {cities.length > 0 ? (
              cities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))
            ) : (
              <option value="" disabled>Select a state first</option>
            )}
          </select>
          <label htmlFor="ho_pin_code">Pincode<span className="red">*</span></label>
          <select className="addClientInput" id="ho_pin_code" name="ho_pin_code" value={formData.ho_pin_code} onChange={handleChange} required>
            <option value="">Select Pincode</option>
            {pinCodes.length > 0 ? (
              pinCodes.map((pinCode, index) => (
                <option key={index} value={pinCode}>{pinCode}</option>
              ))
            ) : (
              <option value="" disabled>Select a city first</option>
            )}
            </select>
        </div>
        <span className="para-heading">Bank Details</span>
        <div className="row3">
          <label htmlFor="bank_name">Bank Name<span className="red">*</span></label>
          <input className="addClientInput" type="text" id="bank_name" name="bank_name" placeholder="Enter Bank Name" value={formData.bank_name} onChange={handleChange} required />
          <label htmlFor="bank_account_no">Bank Account No.<span className="red">*</span></label>
          <input className="addClientInput" type="number" id="bank_account_no" name="bank_account_no" placeholder="Enter Bank Account No" value={formData.bank_account_no} onChange={handleChange} required />
          <label htmlFor="ifsc">IFSC<span className="red">*</span></label>
          <input className="addClientInput" type="text" id="ifsc" name="ifsc" placeholder="Enter IFSC" value={formData.ifsc} onChange={handleChange} required />
          <label htmlFor="branch">Branch<span className="red">*</span></label>
          <input className="addClientInput" type="text" id="branch" name="branch" placeholder="Enter Branch" value={formData.branch} onChange={handleChange} required />
        </div>
        {ifscmsg.ifsc && <p className="error red">{ifscmsg.ifsc}</p>}

        <span className="para-heading">Numbers</span>
        <div className="row3">
          <label htmlFor="grno">GR No.<span className="red">*</span></label>
          <input className="addClientInput" type="number" id="grno" name="grno" placeholder="GR No." value={formData.grno} onChange={handleChange} required />
          <label htmlFor="packinglistno">Packing List No. <span className="red">*</span></label>
          <input className="addClientInput" type="number" id="packinglistno" name="packinglistno" placeholder="Packing List No. " value={formData.packinglistno} onChange={handleChange} required />
          <label htmlFor="cashreceiptno">Cash Receipt No.<span className="red">*</span></label>
          <input className="addClientInput" type="number" id="cashreceiptno" name="cashreceiptno" placeholder="Cash Reciept No." value={formData.cashreceiptno} onChange={handleChange} required />
          <label htmlFor="additionalreceipt">Additional Cash Receipt No.<span className="red">*</span></label>
          <input className="addClientInput" type="number" id="additionalreceipt" name="additionalreceipt" placeholder="Additional Cash Receipt No." value={formData.additionalreceipt} onChange={handleChange} required />
        </div>

        <span className="para-heading">Contact</span>
        <div className="row4">
          <label htmlFor="contact_no">Contact No.<span className="red">*</span></label>
          <input className="addClientInput" type="number" id="contact_no" name="contact_no" placeholder="Enter Contact No." value={formData.contact_no} onChange={handleChange} required />
          <label htmlFor="invoice_prefix">Invoice Prefix<span className="red">*</span></label>
          <input className="addClientInput" type="text" id="invoice_prefix" name="invoice_prefix" placeholder="Enter Invoice Prefix" value={formData.invoice_prefix} onChange={handleChange} />
          <label htmlFor="email">Email Address<span className="red">*</span></label>
          <input className="addClientInput" type="email" id="email" name="email" placeholder="Enter Email Address" value={formData.email} onChange={handleChange} required />
          <label htmlFor="password">Password<span className="red">*</span></label>
          <input className="addClientInput" type="password" id="password" name="password" placeholder="Enter Password" minLength="8" value={formData.password} onChange={handleChange} required />
        </div>
        {emailmsg.email && <p className="error red">{emailmsg.email}</p>}
        {additionalAddress && (
          <>
            <span className="para-heading">Branch Office Details</span>
            <div className="row5">
              <label htmlFor="bo_address">Address<span className="red">*</span></label>
              <input className="addClientInput" type="text" id="bo_address" name="bo_address" placeholder="Enter Address" value={formData.bo_address} onChange={handleChange} />

              <label htmlFor="bo_state">State<span className="red">*</span></label>
          <select className="addClientInput" id="bo_state" name="bo_state" value={formData.bo_state} onChange={handleBranchStateChange} required>
            <option value="">Select State</option>
            {states.length > 0 ? (
              states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))
            ) : (
              <option value="" disabled>Loading states...</option>
            )}
          </select>
          <label htmlFor="bo_city">City<span className="red">*</span></label>
          <select className="addClientInput" id="bo_city" name="bo_city" value={formData.bo_city} onChange={handleBranchCityChange} required>
            <option value="">Select City</option>
            {bocities.length > 0 ? (
              bocities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))
            ) : (
              <option value="" disabled>Select a state first</option>
            )}
          </select>
          <label htmlFor="bo_pin_code">Pincode<span className="red">*</span></label>
          <select className="addClientInput" id="bo_pin_code" name="bo_pin_code" value={formData.bo_pin_code} onChange={handleChange} required>
            <option value="">Select Pincode</option>
            {bopinCodes.length > 0 ? (
              bopinCodes.map((pinCode, index) => (
                <option key={index} value={pinCode}>{pinCode}</option>
              ))
            ) : (
              <option value="" disabled>Select a city first</option>
            )}
            </select>
           
            </div>
          </>
        )}
        <div className="row6">
          <button className="addclientbutton" type="submit" >Add Record</button>
          
          <button className="addclientbutton" type="button" onClick={additionalAddressHandler}>Additional Branch</button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}  // Remove close button
      />
    </div>
  );
};

export default AddClient;
