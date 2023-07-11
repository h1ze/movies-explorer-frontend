import React, { useCallback, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { SHORTS_DURATION } from '../../utils/constants';

const SavedMovies = ({ cards, getSavedCards, onDelete, isCardsError }) => {
  const [isShortsSaved, setIsShortsSaved] = useState(false);
  const [foundSavedCards, setFoundSavedCards] = useState([]);

  const toggleIsShortsSaved = () => {
    setIsShortsSaved(!isShortsSaved);
    localStorage.setItem('isShortsSaved', !isShortsSaved);
  };

  const searchSavedMovies = useCallback(() => {
    const search = localStorage.getItem('searchInSavedText') || '';
    let finded;
    if (!search) {
      finded = cards;
      setFoundSavedCards(finded);
      localStorage.setItem('foundSavedCards', JSON.stringify(finded));
    } else {
      finded = cards.filter((el) =>
        el.nameRU.toLowerCase().includes(search.toLowerCase())
      );
      setFoundSavedCards(finded);
      localStorage.setItem('foundSavedCards', JSON.stringify(finded));
    }

    if (isShortsSaved) {
      const filtered = finded.filter((el) => el.duration <= SHORTS_DURATION);
      setFoundSavedCards(filtered);
      localStorage.setItem('foundSavedCards', JSON.stringify(filtered));
    }
  }, [isShortsSaved, cards]);

  useEffect(() => {
    getSavedCards();
    if ('isShortsSaved' in localStorage) {
      setIsShortsSaved(JSON.parse(localStorage.getItem('isShortsSaved')));
    }
  }, [getSavedCards]);

  useEffect(() => {
    searchSavedMovies();
  }, [searchSavedMovies]);

  return (
    <main className="saved">
      <SearchForm
        isChecked={isShortsSaved}
        onSearch={searchSavedMovies}
        onChangeFilter={toggleIsShortsSaved}
      />
      <MoviesCardList
        cards={foundSavedCards}
        onDelete={onDelete}
        isError={isCardsError}
      />
      <div className="saved__placeholder"></div>
    </main>
  );
};

export default SavedMovies;
