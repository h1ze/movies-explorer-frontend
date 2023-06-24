import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

const SavedMovies = ({ cards }) => {
  return (
    <main className="saved">
      <SearchForm />
      <section className="saved__movies">
        <MoviesCardList cards={cards} />
      </section>
      <div className="saved__placeholder"></div>
    </main>
  );
};

export default SavedMovies;
