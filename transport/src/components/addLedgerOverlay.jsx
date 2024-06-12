import React from 'react';
import '../styles/addLedgerOverlay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import LedgerForm from './ledgerForm';


const AddLedgerOverlay = ({ isVisible, onClose }) => {
  return (
    <div className={`ledger-overlay ${isVisible ? 'show' : ''}`}>
      <div className="ledger-overlay-content">
        <button type='button' className="ledger-close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
    <LedgerForm/>
      
      </div>
    </div>
  );
};

export default AddLedgerOverlay;
