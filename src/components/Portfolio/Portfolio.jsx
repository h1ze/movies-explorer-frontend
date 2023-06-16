import React from 'react';
import { Link } from 'react-router-dom';
import('./Portfolio.css');

const Portfolio = () => {
  return (
    <div className="portfolio">
      <h4 className="portfolio__title">Портфолио</h4>
      <nav>
        <ul className="portfolio__list">
          <li className="portfolio__item">
            <Link className="portfolio__link" to="#">
              Статичный сайт
              <div className="portfolio__link-icon"></div>
            </Link>
          </li>
          <li className="portfolio__item">
            <Link className="portfolio__link" to="#">
              Адаптивный сайт
              <div className="portfolio__link-icon"></div>
            </Link>
          </li>
          <li className="portfolio__item">
            <Link className="portfolio__link" to="#">
              Одностраничное приложение
              <div className="portfolio__link-icon"></div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Portfolio;
