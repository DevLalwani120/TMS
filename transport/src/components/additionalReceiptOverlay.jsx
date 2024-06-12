import React from 'react';
import '../styles/Overlay.css'; // Import CSS file for styling
// import Tabsbar from './Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import AdditionalReceipt from './additionalReceipt';


const AdditionalReceiptOverlay = ({ isVisible, onClose, videlr,billtyDate ,grossTotal,from,to,consignorName}) => {
  return (
    <div className={`overlay ${isVisible ? 'show' : ''}`}>
      <div className="overlay-content">
        <button type='button' className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      <AdditionalReceipt videlr={videlr} billtyDate={billtyDate} grossTotal={grossTotal} from={from} to={to} consignorName={consignorName}/>
      
      </div>
    </div>
  );
};

export default AdditionalReceiptOverlay;
