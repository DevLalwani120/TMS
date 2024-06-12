import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import '../styles/showAdditionalCashReceipt.css'

const ShowAdditionalCashReceipt = () => {  
  const navigate = useNavigate(); 
  const [cash, setCash] = useState([]);

  useEffect(() => {
    const fetchAdditionalCashReceipt = async () => {
      try {
        const email = sessionStorage.getItem('email'); 
        console.log(email);
        const response = await axios.get('https://tms-server-nt4d.onrender.com/getaddcashreceiptdetails', {
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
    fetchAdditionalCashReceipt();
  }, []);

  

  return (
    <div className='show-add'>
      <h2>Additional Receipt List</h2>
      <table className='show-addcash-table'>
        <thead>
          <tr>
            <th>Additional Receipt No</th>
            <th>GR No</th>
            <th>Received From</th>
            <th>Additional Receipt Date</th>
            <th>Total</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {cash.map((party, index) => (
            <tr key={index}>
              <td>{party.additionalreceiptno}</td>
              <td>{party.grno}</td>
              <td>{party.additionalreceiptreceivedfrom}</td>
              <td>{party.additionalreceiptdate}</td>
              <td>{party.total}</td>

              <td>
              <button onClick={() => navigate('/additional-cash-receipt-preview', { state: { grNo: party.grno } })}>
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

export default ShowAdditionalCashReceipt;
