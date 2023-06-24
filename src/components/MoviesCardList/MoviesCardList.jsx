import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import('./MoviesCardList.css');

const MoviesCardList = ({ cards }) => {
  return (
    <ul className="items">
      {cards.map((card) => {
        return <MoviesCard card={card} key={card.id} />;
      })}
    </ul>
  );
};

export default MoviesCardList;
