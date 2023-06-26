import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Menu.css';

const Menu = ({ isOpen, onClose }) => {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <Navigation isMenu={isOpen} />
      </div>
    </div>
  );
};

export default Menu;
