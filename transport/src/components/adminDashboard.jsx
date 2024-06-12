import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AddClient from './addClient';
import ShowClients from './showClients';
import '../styles/adminDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons';



const AdminDashboard = () => {
  const navigate = useNavigate();
  const adminName = "Admin"; // Replace this with dynamic admin name if available

  const handleLogout = () => {
    // Handle logout logic here
    sessionStorage.removeItem('email')
    navigate('/');
  };

  return (
    <div className='maindash'>
    <div className="admin-dashboard">
      <div className="navbar">
        <ul>
          <li>
            <Link to="addClient">Add Client</Link>
          </li>
          <li>
            <Link to="showClients">Show Clients</Link>
          </li>
        </ul>
        <button className="logout-button" onClick={handleLogout}>
        Logout  <FontAwesomeIcon icon={faSignOutAlt}/>
        </button>
      </div>
   
        <Routes>
          <Route path="/home" element={<HomeScreen adminName={adminName} />} />
          <Route path="/addClient" element={<AddClient />} />
          <Route path="/showClients" element={<ShowClients />} />
          <Route path="/" element={<HomeScreen adminName={adminName} />} /> {/* Default route */}
        </Routes>
    
    </div>
    </div>
  );
};

const HomeScreen = ({ adminName }) => {
  return (
    <div className="home-screen">
      <h1>Welcome, {adminName}</h1>
    </div>
  );
};

export default AdminDashboard;