import React from 'react';
import movies from '../../utils/movies';
import MoviesCard from '../MoviesCard/MoviesCard';
import('./MoviesCardList.css');

const MoviesCardList = () => {
  return (
    <section className="movies-cards">
      <ul className="movies-cards__list">
        {movies.map((card) => {
          return <MoviesCard card={card} />;
        })}
      </ul>
    </section>
  );
};

export default MoviesCardList;
