import React from 'react';
import './NavTab.css';
import { Link } from 'react-router-dom';

const NavTab = () => {
  return (
    <div className="nav-tab">
      <div className="nav-tab__wrapper">
        <ul className="nav-tab__links">
          <li>
            <Link className="nav-tab__link">О проекте</Link>
          </li>
          <li>
            <Link className="nav-tab__link">Технологии</Link>
          </li>
          <li>
            <Link className="nav-tab__link">Студент</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavTab;
