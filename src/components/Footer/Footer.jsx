import React from 'react';
import { Link } from 'react-router-dom';
import('./Footer.css');

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <h3 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h3>
        <div className="footer__info">
          <p className="footer__copyright">&copy;&nbsp;2023</p>
          <ul className="footer__links">
            <li>
              <Link
                className="footer__link"
                to="https://practicum.yandex.ru/"
                target="_blank"
              >
                Яндекс.Практикум
              </Link>
            </li>
            <li>
              <Link
                className="footer__link"
                to="https://github.com/"
                target="_blank"
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
