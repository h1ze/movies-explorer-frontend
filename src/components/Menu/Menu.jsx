import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Menu.css';

const Menu = () => {
  const isOpen = true;
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick=""></button>
        <Navigation isMenu={isOpen} />
      </div>
    </div>
  );
};

export default Menu;
