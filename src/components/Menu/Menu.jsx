import React, { useCallback, useEffect } from 'react';
import Navigation from '../Navigation/Navigation';
import './Menu.css';
import { ESCAPE_KEY } from '../../utils/constants';

const Menu = ({ isOpen, onClose }) => {
  const handleEscPress = useCallback(
    (evt) => evt.key === ESCAPE_KEY && onClose(),
    [onClose]
  );

  useEffect(() => {
    isOpen
      ? document.addEventListener('keyup', handleEscPress)
      : document.removeEventListener('keyup', handleEscPress);
  }, [isOpen, handleEscPress]);

  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      onMouseDown={(evt) => evt.target === evt.currentTarget && onClose()}
    >
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
