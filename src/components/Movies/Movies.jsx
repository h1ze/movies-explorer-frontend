import React, { useCallback, useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMoviesApi } from '../../utils/MoviesApi';

const Movies = ({}) => {
  const [movies, setMovies] = useState([]);
  const [findedMovies, setFindedMovies] = useState([]);
  const [cards, setCards] = useState([]);
  const [isShorts, setIsShorts] = useState(false);

  function getMovies() {
    getMoviesApi().then((resMovies) => {
      localStorage.setItem('movies', JSON.stringify(resMovies));
      setMovies(resMovies);
    });
  }

  const toggleIsShorts = () => {
    setIsShorts(!isShorts);
    localStorage.setItem('isShorts', !isShorts);
  };

  const setRenderedCards = useCallback(() => {
    const search = localStorage.getItem('searchText');
    const finded = movies.filter((el) =>
      el.nameRU.toLowerCase().includes(search.toLowerCase())
    );
    setFindedMovies(finded);
    localStorage.setItem('findedMovies', JSON.stringify(finded));
    if (isShorts) {
      const filteredMovies = finded.filter((el) => el.duration <= 40);
      setCards(filteredMovies);
      localStorage.setItem('cards', JSON.stringify(filteredMovies));
    } else {
      setCards(finded);
      localStorage.setItem('cards', JSON.stringify(finded));
    }
  }, [movies, isShorts]);

  useEffect(() => {
    if ('movies' in localStorage) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem('isShorts') === 'true') {
      setIsShorts(true);
    }

    setRenderedCards();
  }, [setRenderedCards, isShorts]);

  return (
    <main className="movies">
      <SearchForm
        onSearch={getMovies}
        onChangeFilter={toggleIsShorts}
        isShorts={isShorts}
      />
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
