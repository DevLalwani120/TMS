import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import '../styles/Showcashreceipttable.css'

const ShowCashReceipt = () => {  
  const navigate = useNavigate(); 
  const [cash, setCash] = useState([]);

  useEffect(() => {
    const fetchCashReceipt = async () => {
      try {
        const email = sessionStorage.getItem('email'); 
        console.log(email);
        const response = await axios.get('https://tms-server-nt4d.onrender.com/getcashreceiptdetails', {
          headers: {
            'x-client-email': email 
          }
        });
        console.log(response);
        setCash(response.data);
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    };
    fetchCashReceipt();
  }, []);

  

  return (
    <div className='show-cash'>
      <h2>Cash Receipt List</h2>
      <table className='show-cash-table'>
        <thead>
          <tr>
            <th>Cash Receipt No</th>
            <th>GR No</th>
            <th>Received From</th>
            <th>Cash/Cheque No</th>
            <th>Cash Receipt date</th>
            <th>Gross Total</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {cash.map((party, index) => (
            <tr key={index}>
              <td>{party.cashreceiptno}</td>
              <td>{party.grno}</td>
              <td>{party.receivedFrom}</td>
              <td>{party.cashOrChequeNo}</td>
              <td>{party.cashreceiptdate}</td>
              <td>{party.grossTotal}</td>

              <td>
              <button onClick={() => navigate('/cash-receipt-preview', { state: { grNo: party.grno } })}>
                  <FontAwesomeIcon icon={faEye} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        closeButton={false}  // Remove close button
      />
    </div>
  );
};

export default ShowCashReceipt;
