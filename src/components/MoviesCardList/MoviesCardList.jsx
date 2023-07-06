import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import('./MoviesCardList.css');

const MoviesCardList = ({
  cards,
  onSave,
  onDelete,
  isErrorMoviesResponse,
}) => {
  return (
    <section className="content">
      {isErrorMoviesResponse ? (
        <h2 className="content__message">
          Во&nbsp;время запроса произошла ошибка. Возможно, проблема
          с&nbsp;соединением или сервер недоступен. Подождите немного
          и&nbsp;попробуйте ещё раз
        </h2>
      ) : 'movies' in localStorage && !cards.length ? (
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
