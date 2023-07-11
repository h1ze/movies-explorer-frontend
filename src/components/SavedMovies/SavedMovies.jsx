import React, { useCallback, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { SHORTS_DURATION } from '../../utils/constants';

const SavedMovies = ({ cards, getSavedCards, onDelete, isCardsError }) => {
  const [isShortsSaved, setIsShortsSaved] = useState(false);
  const [foundSavedCards, setFoundSavedCards] = useState([]);
  const [searchString, setSearchString] = useState('');

  const toggleIsShortsSaved = () => {
    setIsShortsSaved(!isShortsSaved);
  };

  const searchSavedMovies = useCallback(() => {
    let finded;
    if (!searchString) {
      finded = cards;
      setFoundSavedCards(finded);
      localStorage.setItem('foundSavedCards', JSON.stringify(finded));
    } else {
      finded = cards.filter((el) =>
        el.nameRU.toLowerCase().includes(searchString.toLowerCase())
      );
      setFoundSavedCards(finded);
      localStorage.setItem('foundSavedCards', JSON.stringify(finded));
    }

    if (isShortsSaved) {
      const filtered = finded.filter((el) => el.duration <= SHORTS_DURATION);
      setFoundSavedCards(filtered);
      localStorage.setItem('foundSavedCards', JSON.stringify(filtered));
    }
  }, [isShortsSaved, cards, searchString]);

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
        setSearchString={setSearchString}
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
