import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ onMenuClick, isloggedIn }) => {
  const { pathname } = useLocation();
  const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];
  return (
    <>
      {headerPaths.includes(pathname) && (
        <Header onMenuClick={onMenuClick} isloggedIn={isloggedIn} />
      )}
      <Outlet />
      {footerPaths.includes(pathname) && <Footer />}
    </>
  );
};

export default Layout;
