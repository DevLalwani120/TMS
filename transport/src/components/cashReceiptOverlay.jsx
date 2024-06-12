import React from 'react';
import '../styles/Overlay.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import CashReceipt from './cashReceipt';



const CashReceiptOverlay = ({ isVisible, onClose ,docketno ,grossTotal ,billtyDate , from , to}) => {

  return (
    <div className={`overlay ${isVisible ? 'show' : ''}`}>
      <div className="overlay-content">
        <button type='button' className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      <CashReceipt docketno={docketno} grossTotal={grossTotal} billtyDate={billtyDate}  from={from} to={to}/>
      
      </div>
    </div>
  );
};

export default CashReceiptOverlay;
