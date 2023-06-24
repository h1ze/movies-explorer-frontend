import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <nav className="nav-tab">
      <div className="nav-tab__wrapper">
        <ul className="nav-tab__links">
          <li>
            <a className="nav-tab__link" href="#about-project">
              О проекте
            </a>
          </li>
          <li>
            <a className="nav-tab__link" href="#techs">
              Технологии
            </a>
          </li>
          <li>
            <a className="nav-tab__link" href="#about-me">
              Студент
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavTab;
