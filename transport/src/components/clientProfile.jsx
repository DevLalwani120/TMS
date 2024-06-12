import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../styles/ProfileClient.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClientProfile = () => {
  const [additionalAddress, setAdditionalAddress] = useState(false);
  const [clientsdata, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const email = sessionStorage.getItem('email'); 
        console.log(email);
        const response = await axios.get('https://tms-server-nt4d.onrender.com/showclientdetails', {
          headers: {
            'x-client-email': email 
          }
        });
        console.log(response);
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    };
    fetchClients();
  }, []);

  const additionalAddressHandler = () => {
    setAdditionalAddress(!additionalAddress);
  };

  return (
    <div className="profile-addclientcontainer">
      {clientsdata.map((client, index) => (
        <form className="profile-addclientform" key={index}>
          <span className="para-heading">Company Details</span>
          <div className="row1">
            <label htmlFor="owner_name">Owner Name<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="owner_name" name="owner_name" placeholder="Enter Owner Name" value={client.owner_name} disabled />

            <label htmlFor="company_name">Company Name<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="company_name" name="company_name" placeholder="Enter Company Name" value={client.company_name} disabled />

            <label htmlFor="gstin">GSTIN<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="gstin" name="gstin" placeholder="Enter GSTIN" value={client.gstin} disabled />

            <label htmlFor="cin">CIN (if Applicable)<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="cin" name="cin" placeholder="Enter CIN" value={client.cin} disabled />
          </div>
          
          <span className="para-heading">Head Office Details</span>
          <div className="row2">
            <label htmlFor="ho_address">Address<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="ho_address" name="ho_address" placeholder="Enter Address" value={client.ho_address} disabled />

            <label htmlFor="ho_state">State<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="ho_state" name="ho_state" value={client.ho_state} disabled />

            <label htmlFor="ho_city">City<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="ho_city" name="ho_city" value={client.ho_city} disabled />
            <label htmlFor="ho_pin_code">Pincode<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="ho_pin_code" name="ho_pin_code" value={client.ho_pin_code} disabled />
          </div>

          <span className="para-heading">Bank Details</span>
          <div className="row3">
            <label htmlFor="bank_name">Bank Name<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="bank_name" name="bank_name" placeholder="Enter Bank Name" value={client.bank_name} disabled />
            <label htmlFor="bank_account_no">Bank Account No.<span className="red">*</span></label>
            <input className="addClientInput" type="number" id="bank_account_no" name="bank_account_no" placeholder="Enter Bank Account No" value={client.bank_account_no} disabled />
            <label htmlFor="ifsc">IFSC<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="ifsc" name="ifsc" placeholder="Enter IFSC" value={client.ifsc} disabled />
            <label htmlFor="branch">Branch<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="branch" name="branch" placeholder="Enter Branch" value={client.branch} disabled />
          </div>

          <span className="para-heading">Numbers</span>
          <div className="row3">
            <label htmlFor="grno">GR No.<span className="red">*</span></label>
            <input className="addClientInput" type="number" id="grno" name="grno" placeholder="GR No." value={client.grno} disabled />
            <label htmlFor="packinglistno">Packing List No.<span className="red">*</span></label>
            <input className="addClientInput" type="number" id="packinglistno" name="packinglistno" placeholder="Packing List No." value={client.packinglistno} disabled />
            <label htmlFor="cashreceiptno">Cash Receipt No.<span className="red">*</span></label>
            <input className="addClientInput" type="number" id="cashreceiptno" name="cashreceiptno" placeholder="Cash Receipt No." value={client.cashreceiptno} disabled />
            <label htmlFor="additionalreceipt">Additional Cash Receipt No.<span className="red">*</span></label>
            <input className="addClientInput" type="number" id="additionalreceipt" name="additionalreceipt" placeholder="Additional Cash Receipt No." value={client.additionalreceipt} disabled />
          </div>

          <span className="para-heading">Contact</span>
          <div className="row4">
            <label htmlFor="contact_no">Contact No.<span className="red">*</span></label>
            <input className="addClientInput" type="number" id="contact_no" name="contact_no" placeholder="Enter Contact No." value={client.contact_no} disabled />
            <label htmlFor="invoice_prefix">Invoice Prefix<span className="red">*</span></label>
            <input className="addClientInput" type="text" id="invoice_prefix" name="invoice_prefix" placeholder="Enter Invoice Prefix" value={client.invoice_prefix} disabled />
            <label htmlFor="email">Email Address<span className="red">*</span></label>
            <input className="addClientInput" type="email" id="email" name="email" placeholder="Enter Email Address" value={client.email} disabled />
            <label htmlFor="password">Password<span className="red">*</span></label>
            <input className="addClientInput" type="password" id="password" name="password" placeholder="Enter Password" minLength="8" value={client.password} disabled />
          </div>

          {additionalAddress && (
            <>
              <span className="para-heading">Branch Office Details</span>
              <div className="row5">
                <label htmlFor="bo_address">Address<span className="red">*</span></label>
                <input className="addClientInput" type="text" id="bo_address" name="bo_address" placeholder="Enter Address" value={client.bo_address} disabled />

                <label htmlFor="bo_state">State<span className="red">*</span></label>
                <input className="addClientInput" type="text" id="bo_state" name="bo_state" value={client.bo_state} disabled />

                <label htmlFor="bo_city">City<span className="red">*</span></label>
                <input className="addClientInput" type="text" id="bo_city" name="bo_city" value={client.bo_city} disabled />

                <label htmlFor="bo_pin_code">Pincode<span className="red">*</span></label>
                <input className="addClientInput" type="text" id="bo_pin_code" name="bo_pin_code" value={client.bo_pin_code} disabled />
              </div>
            </>
          )}

          <div className="row6">
            <button className="addclientbutton" type="button" onClick={additionalAddressHandler}>Additional Branch</button>
          </div>
        </form>
      ))}
      
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
        closeButton={false}
      />
    </div>
  );
};

export default ClientProfile;
