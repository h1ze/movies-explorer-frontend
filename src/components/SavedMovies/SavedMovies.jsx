import React, { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

const SavedMovies = ({ cards, onDelete }) => {
  const [isShortsSaved, setIsShortsSaved] = useState(false);

  const toggleIsShortsSaved = () => {
    setIsShortsSaved(!isShortsSaved);
    localStorage.setItem('isShorts', !isShortsSaved);
  };

  return (
    <main className="saved">
      <SearchForm
        isChecked={isShortsSaved}
        onChangeFilter={toggleIsShortsSaved}
      />
      <MoviesCardList cards={cards} onDelete={onDelete} />
      <div className="saved__placeholder"></div>
    </main>
  );
};

export default SavedMovies;
