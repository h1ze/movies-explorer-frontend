import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = () => {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList />
      <div className="movies__btn-container">
        <button className="movies__btn" type="button">
          Ещё
        </button>
      </div>
    </main>
  );
};

export default Movies;
