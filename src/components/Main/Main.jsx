import React, { useEffect } from 'react';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import { useNavigate } from 'react-router-dom';

const Main = ({ isloggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isloggedIn) {
      navigate('/movies', { replace: true });
    }
  }, [isloggedIn, navigate]);

  return (
    <main>
      <Promo />
      <NavTab />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  );
};

export default Main;
