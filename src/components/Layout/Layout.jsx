import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = () => {
  const { pathname } = useLocation();
  const footerPaths = ['/', '/movies', '/saved-movies'];
  return (
    <>
      <Header />
      <Outlet />
      {footerPaths.includes(pathname) && <Footer />}
    </>
  );
};

export default Layout;
