import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/showledger.css'

const PartyTable = () => {  
  const [parties, setParties] = useState([]);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const email = sessionStorage.getItem('email'); 
        console.log(email);
        const response = await axios.get('https://tms-server-nt4d.onrender.com/parties', {
          headers: {
            'x-client-email': email 
          }
        });
        console.log(response);
        setParties(response.data);
      } catch (error) {
        console.error('Error fetching parties:', error);
      }
    };
    fetchParties();
  }, []);

  const deleteParty = async (id) => {
    try {
      const response = await fetch(`https://tms-server-nt4d.onrender.com/deleteparty/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setParties(parties.filter(party => party.id !== id));
        toast.success('Party deleted successfully');
      } else {
        console.error('Error deleting party');
        toast.error('Error deleting party');
      }
    } catch (error) {
      console.error('Error deleting party:', error);
      toast.error('Error deleting party');
    }
  };

  return (
    <div className='show-ledger'>
      <h2>Party List</h2>
      <table className='show-ledger-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>GSTIN</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((party, index) => (
            <tr key={index}>
              <td>{party.name}</td>
              <td>{party.contact}</td>
              <td>{party.gstin}</td>
              <td>
                <button onClick={() => deleteParty(party.id)}>
                  <FontAwesomeIcon icon={faTrash} />
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

export default PartyTable;
