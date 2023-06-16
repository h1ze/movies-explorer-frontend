import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import('./Logo.css');

const Logo = () => {
  return (
    <Link className="logo-link " to="/">
      <img src={logo} className="logo-link__img" alt="Логотип" />
    </Link>
  );
};

export default Logo;
