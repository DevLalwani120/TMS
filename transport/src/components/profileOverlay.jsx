import React from 'react';
import '../styles/profileOverlay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ClientProfile from './clientProfile';


const ProfileOverlay = ({ isVisible, onClose }) => {
  return (
    <div className={`profile-overlay ${isVisible ? 'show' : ''}`}>
      <div className="profile-overlay-content">
        <button type='button' className="profile-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <ClientProfile />
      
      </div>
    </div>
  );
};

export default ProfileOverlay;
