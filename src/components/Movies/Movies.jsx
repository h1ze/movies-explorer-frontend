import React, { useCallback, useEffect, useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getMoviesApi } from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

const Movies = ({ onSave, onDelete }) => {
  const [movies, setMovies] = useState([]);
  const [findedMovies, setFindedMovies] = useState([]);
  const [cards, setCards] = useState([]);
  const [isShorts, setIsShorts] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isNotFoundMovies, setIsNotFoundMovies] = useState(false);
  const [isErrorMoviesResponse, setIsErrorMoviesResponse] = useState(false);

  // function getMovies() {
  //   setIsSearching(true);
  //   if ('movies' in localStorage) {
  //     setMovies(JSON.parse(localStorage.getItem('movies')));
  //     setIsSearching(false);
  //   } else {
  //     getMoviesApi()
  //       .then((resMovies) => {
  //         localStorage.setItem('movies', JSON.stringify(resMovies));
  //         setMovies(resMovies);
  //       })
  //       .catch((err) => {
  //         console.log(err); // выведем ошибку в консоль
  //       })
  //       .finally(() => {
  //         setIsSearching(false);
  //       });
  //   }
  // }

  function getMovies() {
    setIsSearching(true);
    if (movies.length !== 0) {
      setRenderedCards();
      setIsSearching(false);
    } else {
      getMoviesApi()
        .then((resMovies) => {
          setIsErrorMoviesResponse(false);
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

    if (finded.length !== 0) {
      setIsNotFoundMovies(false);
      localStorage.setItem('findedMovies', JSON.stringify(finded));
      setFindedMovies(finded);
    } else {
      setIsNotFoundMovies(true);
    }

    if (isShorts) {
      const filteredMovies = finded.filter((el) => el.duration <= 40);
      if (filteredMovies.length !== 0) {
        setIsNotFoundMovies(false);
        setCards(filteredMovies);
        localStorage.setItem('cards', JSON.stringify(filteredMovies));
      } else {
        setIsNotFoundMovies(true);
      }
    } else {
      setCards(finded);
      localStorage.setItem('cards', JSON.stringify(finded));
    }
  }, [movies, isShorts]);

  useEffect(() => {
    if ('movies' in localStorage) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
    }

    if (localStorage.getItem('isShorts') === 'true') {
      setIsShorts(true);
    }

    if (localStorage.getItem('isErrorMoviesResponse') === 'true') {
      setIsErrorMoviesResponse(true);
    }

    if (localStorage.getItem('isNotFoundMovies') === 'true') {
      setIsNotFoundMovies(true);
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
      {/* <section className="movies__cards">
        {isSearching ? (
          <Preloader />
        ) : isErrorMoviesResponse ? (
          <h2 className="movies__message">
            Во&nbsp;время запроса произошла ошибка. Возможно, проблема
            с&nbsp;соединением или сервер недоступен. Подождите немного
            и&nbsp;попробуйте ещё раз
          </h2>
        ) : isNotFoundMovies ? (
          <h2 className="movies__message">Ничего не найдено</h2>
        ) : (
          <MoviesCardList cards={cards} onSave={onSave} onDelete={onDelete} />
        )}
      </section> */}
      <>
        {isSearching ? (
          <Preloader />
        ) : (
          <MoviesCardList
            cards={cards}
            onSave={onSave}
            onDelete={onDelete}
            isErrorMoviesResponse={isErrorMoviesResponse}
            isNotFoundMovies={isNotFoundMovies}
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
