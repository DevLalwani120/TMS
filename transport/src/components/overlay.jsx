import React from 'react';
import '../styles/Overlay.css'; // Import CSS file for styling
import Tabsbar from './Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


const OverlayTabs = ({ isVisible, onClose ,docketno}) => {
  return (
    <div className={`overlay ${isVisible ? 'show' : ''}`}>
      <div className="overlay-content">
        <button  type='button' className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <Tabsbar docketno={docketno}/>
      
      </div>
    </div>
  );
};

export default OverlayTabs;
