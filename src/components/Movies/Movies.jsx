import React, { useCallback, useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMoviesApi } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import useWindowWidth from '../../utils/useWindowWidth';

const Movies = ({ onSave, onDelete }) => {
  const [movies, setMovies] = useState([]);
  const [foundCards, setFoundCards] = useState([]);
  const [isShorts, setIsShorts] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isErrorMoviesResponse, setIsErrorMoviesResponse] = useState(false);

  const [initialCount, setInitialCount] = useState(0);
  const [addedCount, setAddedCount] = useState(0);
  const [renderedCards, setRenderedCards] = useState([]);
  const [isCardsEnded, setIsCardsEnded] = useState(false);

  const windowWidth = useWindowWidth();

  function getMovies() {
    setIsSearching(true);
    if ('movies' in localStorage) {
      searchMovies();
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

  const searchMovies = useCallback(() => {
    const search = localStorage.getItem('searchText');
    const finded = movies.filter((el) =>
      el.nameRU.toLowerCase().includes(search.toLowerCase())
    );
    setFoundCards(finded);
    localStorage.setItem('foundCards', JSON.stringify(finded));

    if (isShorts) {
      const filtered = finded.filter((el) => el.duration <= 40);
      setFoundCards(filtered);
      localStorage.setItem('foundCards', JSON.stringify(filtered));
    }
  }, [movies, isShorts]);

  const calculateRenderCount = useCallback(() => {
    if (windowWidth >= 320 && windowWidth <= 480) {
      setInitialCount(5);
      setAddedCount(2);
    } else if (windowWidth > 480 && windowWidth <= 768) {
      setInitialCount(8);
      setAddedCount(2);
    } else if (windowWidth > 768) {
      setInitialCount(12);
      setAddedCount(4);
    }
  }, [windowWidth]);

  const renderCards = useCallback(() => {
    const rendered = foundCards.slice(0, initialCount);
    setRenderedCards(rendered);
  }, [foundCards]);

  const handleAddCards = () => {
    let sum = 0;
    sum = +initialCount + addedCount;
    setInitialCount(sum);
    if (sum >= foundCards.length) {
      setIsCardsEnded(true);
    }
    const rendered = foundCards.slice(0, sum);
    setRenderedCards(rendered);
  };

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

    if ('foundCards' in localStorage) {
      setFoundCards(JSON.parse(localStorage.getItem('foundCards')));
    }
  }, []);

  useEffect(() => {
    searchMovies();
  }, [searchMovies]);

  useEffect(() => {
    calculateRenderCount();
    renderCards();
  }, [calculateRenderCount, renderCards]);

  return (
    <main className="movies">
      <SearchForm
        isChecked={isShorts}
        onSearch={getMovies}
        onChangeFilter={toggleIsShorts}
      />
      <>
        {isSearching ? (
          <Preloader />
        ) : (
          <MoviesCardList
            cards={renderedCards}
            onSave={onSave}
            onDelete={onDelete}
            isErrorMoviesResponse={isErrorMoviesResponse}
          />
        )}
      </>
      <div className="movies__btn-container">
        <button
          className="movies__btn"
          type="button"
          onClick={handleAddCards}
          disabled={isCardsEnded}
        >
          Ещё
        </button>
      </div>
    </main>
  );
};

export default Movies;
