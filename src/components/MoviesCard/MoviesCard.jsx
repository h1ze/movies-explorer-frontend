import React, { useState } from 'react';
import './MoviesCard.css';
import { URL_FOR_MOVIES_IMAGES } from '../../utils/constants';

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
      <a
        className="item__link"
        href={card.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="item__image"
          src={`${URL_FOR_MOVIES_IMAGES}${card.image.url}`}
          alt={card.nameRU}
        />
      </a>
      <div className="item__panel">
        <h2 className="item__title">{card.nameRU}</h2>
        {!!card.saved ? (
          <button
            className="item__button-delete"
            type="button"
            aria-label="Удалить"
          ></button>
        ) : (
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайкнуть"
            onClick={likeClickHandler}
          ></button>
        )}
      </div>
      <span className="item__duration">{card.duration}</span>
    </li>
  );
};

export default MoviesCard;
