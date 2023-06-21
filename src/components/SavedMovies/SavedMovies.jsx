import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

const SavedMovies = () => {
  return (
    <main className="saved">
      <SearchForm />
      <section className="saved__movies">
        <MoviesCardList />
      </section>
      <div className="saved__placeholder"></div>
    </main>
  );
};

export default SavedMovies;
