import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import('./MoviesCardList.css');

const MoviesCardList = ({ cards, onSave, onDelete }) => {
  return (
    <ul className="items">
      {cards.map((card) => {
        return (
          <MoviesCard
            card={card}
            key={card.id}
            onSave={onSave}
            onDelete={onDelete}
          />
        );
      })}
    </ul>
  );
};

export default MoviesCardList;
