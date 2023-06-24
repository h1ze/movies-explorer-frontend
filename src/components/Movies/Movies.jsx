import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({ cards }) => {
  return (
    <main className="movies">
      <SearchForm />
      <section className="movies__cards">
        <MoviesCardList cards={cards} />
      </section>
      <div className="movies__btn-container">
        <button className="movies__btn" type="button">
          Ещё
        </button>
      </div>
    </main>
  );
};

export default Movies;
