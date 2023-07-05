import React, { useCallback, useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMoviesApi } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';


const Movies = ({ onSave, onDelete }) => {
  const [movies, setMovies] = useState([]);
  const [cards, setCards] = useState([]);
  const [isShorts, setIsShorts] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isErrorMoviesResponse, setIsErrorMoviesResponse] = useState(false);


  function getMovies() {
    setIsSearching(true);
    if ('movies' in localStorage) {
      setRenderedCards();
      setIsSearching(false);
    } else {
      getMoviesApi()
        .then((resMovies) => {
          setIsErrorMoviesResponse(false);
          localStorage.setItem('isErrorMoviesResponse', JSON.stringify(false));
          setMovies(resMovies);
          localStorage.setItem('movies', JSON.stringify(resMovies));
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
          setIsErrorMoviesResponse(true);
          localStorage.setItem('isErrorMoviesResponse', JSON.stringify(true));
        })
        .finally(() => {
          setIsSearching(false);
        });
    }
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
    setCards(finded);
    localStorage.setItem('cards', JSON.stringify(finded));

    if (isShorts) {
      const filtered = finded.filter((el) => el.duration <= 40);
      setCards(filtered);
      localStorage.setItem('cards', JSON.stringify(filtered));
    }
  }, [movies, isShorts]);

  useEffect(() => {
    if ('movies' in localStorage) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
    }

    if ('isShorts' in localStorage) {
      setIsShorts(JSON.parse(localStorage.getItem('isShorts')));
    }

    if (localStorage.getItem('isErrorMoviesResponse') === 'true') {
      setIsErrorMoviesResponse(true);
    }

    if ('cards' in localStorage) {
      setCards(JSON.parse(localStorage.getItem('cards')));
    }
  }, []);

  useEffect(() => {
    setRenderedCards();
  }, [setRenderedCards]);

  return (
    <main className="movies">
      <SearchForm
        onSearch={getMovies}
        onChangeFilter={toggleIsShorts}
        isShorts={isShorts}
      />
      <>
        {isSearching ? (
          <Preloader />
        ) : (
          <MoviesCardList
            cards={cards}
            onSave={onSave}
            onDelete={onDelete}
            isErrorMoviesResponse={isErrorMoviesResponse}
          />
        )}
      </>
      <div className="movies__btn-container">
        <button className="movies__btn" type="button">
          Ещё
        </button>
      </div>
    </main>
  );
};

export default Movies;
