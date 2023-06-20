import React, { useState } from 'react';
import './MoviesCard.css';

const MoviesCard = ({ card }) => {
  const [isLiked, setIsLiked] = useState(false);
  const likeClickHandler = () => {
    setIsLiked(!isLiked);
  };
  const cardLikeButtonClassName = `item__button-like ${
    isLiked && 'item__button-like_active'
  }`;

  return (
    <li className="item">
      <img className="item__image" src={card.link} alt={card.name} />
      <div className="item__panel">
        <h2 className="item__title">{card.name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Лайкнуть"
          onClick={likeClickHandler}
        ></button>
      </div>
      <span className="item__duration">{card.duration}</span>
    </li>
  );
};

export default MoviesCard;
