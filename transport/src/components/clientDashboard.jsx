import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import '../styles/clientDashboard.css';
import Invoice from './Invoice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser } from '@fortawesome/free-solid-svg-icons';
import LedgerForm from './ledgerForm';
import PartyTable from './showLedger';
import ClientProfile from './clientProfile';
import ProfileOverlay from './profileOverlay';
import ShowBillty from './showBillty';
import ShowCashReceipt from './showCashReceipt';
import ShowAdditionalCashReceipt from './showAdditionalCash';



const ClientDashboard = () => {
  const navigate = useNavigate();
  const adminName = "Admin";
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    navigate('/');
    sessionStorage.removeItem('email')
  };

  const openProfileOverlay = () => {
    setProfileVisible(true);
    setDropdownVisible(false);
  };

  const closeProfileOverlay = () => {
    setProfileVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="client-dashboard">
      <div className="top-navbar">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="profile-menu">
          <button className="profile-btn" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} className="profile-icon" />
          </button>
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={openProfileOverlay}>
                Profile
              </div>
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
        <ProfileOverlay isVisible={isProfileVisible} onClose={closeProfileOverlay} />
      </div>
      <div className="main-content">
        <div className="vertical-navbar">
          <ul>
            <li>
              <Link to="invoice">Biilty</Link>
            </li>
            <li>
              <Link to="ledgermaster">Ledger Master</Link>
            </li>
            
            <li>
              <Link to="showledger">Show Ledger</Link>
            </li>
            <li>
              <Link to="showBillty">Show Billty</Link>
            </li>
            <li>
              <Link to="showCashReceipt">Show Cash Receipt</Link>
            </li>
            <li>
              <Link to="showAdditionalCashReceipt">Show Additional Receipt</Link>
            </li>
            
            
          </ul>
        </div>
        <div className="content-area">

          <Routes>
            <Route path="/" element={<HomeScreen adminName={adminName} />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/ledgermaster" element={<LedgerForm />} />
            <Route path="/showledger" element={<PartyTable />} />
            <Route path='/profile' element={<ClientProfile />} />
            <Route path='/showBillty' element={<ShowBillty/>}/>
            <Route path='/showCashReceipt' element={<ShowCashReceipt/>}/>
            <Route path='/showAdditionalCashReceipt' element={<ShowAdditionalCashReceipt/>}/>
      
            
          </Routes>
          
        </div>
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

export default ClientDashboard;
