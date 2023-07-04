import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import('./MoviesCardList.css');

const MoviesCardList = ({ cards, onSave }) => {
  return (
    <ul className="items">
      {cards.map((card) => {
        return <MoviesCard card={card} key={card.id} onSave={onSave} />;
      })}
    </ul>
  );
};

export default MoviesCardList;
