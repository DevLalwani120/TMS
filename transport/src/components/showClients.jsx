//showClients.js
import React, { useEffect, useState } from 'react';
import '../styles/showClients.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const Clients = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetch('https://tms-server-nt4d.onrender.com/getClients')
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`https://tms-server-nt4d.onrender.com/deleteClient/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                setClients(clients.filter(client => client.id !== id));
                toast.success('Client Deleted Successfully');
            } else {
                console.error('Error deleting client');
            }
        })
        .catch(error => console.error('Error deleting client:', error));
    };

    return (
        <div className="show-clients">
            <h2>Show Clients</h2>
            <table className='show-clients-table'>
                <thead>
                    <tr>
                   
                        <th>Name</th>
                        <th>Company Name</th>
                        <th>Email Address</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.owner_name}</td>
                            <td>{client.company_name}</td>
                            <td>{client.email}</td>
                            <td>
                <button onClick={() => handleDelete(client.id)}>
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

export default Clients;