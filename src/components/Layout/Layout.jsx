import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FOOTER_PATHS, HEADER_PATHS } from '../../utils/constants';

const Layout = ({ onMenuClick, isloggedIn }) => {
  const { pathname } = useLocation();
  return (
    <>
      {HEADER_PATHS.includes(pathname) && (
        <Header onMenuClick={onMenuClick} isloggedIn={isloggedIn} />
      )}
      <Outlet />
      {FOOTER_PATHS.includes(pathname) && <Footer />}
    </>
  );
};

export default Layout;
