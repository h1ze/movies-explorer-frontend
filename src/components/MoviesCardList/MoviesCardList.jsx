import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import('./MoviesCardList.css');

const MoviesCardList = ({ cards, onSave, onDelete, isErrorMoviesResponse }) => {
  const [isNotFound, setIsNotFound] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/movies' && 'movies' in localStorage && !cards.length) {
      setIsNotFound(true);
    } else if (pathname === '/saved-movies' && !cards.length) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [pathname, cards.length]);

  return (
    <section className="content">
      {isErrorMoviesResponse ? (
        <h2 className="content__message">
          Во&nbsp;время запроса произошла ошибка. Возможно, проблема
          с&nbsp;соединением или сервер недоступен. Подождите немного
          и&nbsp;попробуйте ещё раз
        </h2>
      ) : isNotFound ? (
        <h2 className="content__message">Ничего не найдено</h2>
      ) : (
        <ul className="items">
          {cards.map((card) => {
            return (
              <MoviesCard
                card={card}
                key={card.id || card.movieId}
                onSave={onSave}
                onDelete={onDelete}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default MoviesCardList;
