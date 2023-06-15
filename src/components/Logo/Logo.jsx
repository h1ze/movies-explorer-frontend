import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link classname="logo-link " to="/">
      <img src={logo} className="logo-link__img" alt="Логотип" />
    </Link>
  );
};

export default Logo;
