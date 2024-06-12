import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/showbilty.css'

const ShowBillty = () => {  
  const [billties, setBillties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBillty = async () => {
      try {
        const email = sessionStorage.getItem('email'); 
        console.log(email);
        const response = await axios.get('https://tms-server-nt4d.onrender.com/billtyList', {
          headers: {
            'email': email 
          }
        });
        console.log(response);
        setBillties(response.data);
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    };
    fetchBillty();
  }, []);

    
  return (
    <div className='show-bilty'>
      <h2>Bilty List</h2>
      <table className='show-bilty-table'>
        <thead>
          <tr>
            <th>GR-No.</th>
            <th>Date</th>
            <th>Consignor Name</th>
            <th>Consignee Name</th>
            <th>Gross Total</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {billties.map((party, index) => (
            <tr key={index}>
              <td>{party.grNo}</td>
              <td>{party.billtydate}</td>
              <td>{party.ConsignorName}</td>
              <td>{party.ConsigneeName}</td>
              <td>{party.grossTotal}</td>
              <td>
                <button onClick={() => navigate('/preview-invoice', { state: { grNo: party.grNo } })}>
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

export default ShowBillty;
