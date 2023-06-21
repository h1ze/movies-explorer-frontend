import React from 'react';
import movies from '../../utils/movies';
import MoviesCard from '../MoviesCard/MoviesCard';
import('./MoviesCardList.css');

const MoviesCardList = () => {
  return (
    <ul className="items">
      {movies.map((card) => {
        return <MoviesCard card={card} key={card.id} />;
      })}
    </ul>
  );
};

export default MoviesCardList;
