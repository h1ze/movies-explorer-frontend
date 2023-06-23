import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="not-found">
      <div className="not-found__wrapper">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link className="not-found__link" to=".." relative="path">
          Назад
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
