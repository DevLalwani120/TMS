import React from 'react';
import '../styles/Overlay.css'; // Import CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PackingList from './packinglist';


const PackingListOverlay = ({ isVisible, onClose ,from ,to, docketno,consigneeName,consignorName, date }) => {
  return (
    <div className={`overlay ${isVisible ? 'show' : ''}`}>
      <div className="overlay-content">
        <button type='button' className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      <PackingList from={from} to={to} docketno={docketno} consigneeName={consigneeName} consignorName={consignorName} date = {date} />
      
      </div>
    </div>
  );
};

export default PackingListOverlay;
