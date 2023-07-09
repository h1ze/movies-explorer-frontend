import React, { useCallback, useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import { SHORTS_DURATION } from '../../utils/constants';
import { getMoviesApi } from '../../utils/MoviesApi';
import { deleteMovieApi, saveMovieApi } from '../../utils/MainApi';

const SavedMovies = ({ cards, getCards, onDelete }) => {
  const [isShortsSaved, setIsShortsSaved] = useState(false);
  const [foundSavedCards, setFoundSavedCards] = useState([]);

  // function getSavedCards() {
  //   if ('savedCards' in localStorage) {
  //     setSavedCards(JSON.parse(localStorage.getItem('savedCards')));
  //     console.log('есть в хранилище');
  //   } else {
  //     console.log('нет в хранилище');
  //     getMoviesApi().then((responseSavedMovies) => {
  //       setSavedCards(responseSavedMovies.data);
  //       localStorage.setItem(
  //         'savedCards',
  //         JSON.stringify(responseSavedMovies.data)
  //       );
  //     });
  //   }
  // }

  // function handleSaveMovie(movieData) {
  //   saveMovieApi(movieData)
  //     .then((resMovieData) => {
  //       setSavedCards([resMovieData.data, ...savedCards]);
  //       localStorage.setItem(
  //         'savedCards',
  //         JSON.stringify([resMovieData.data, ...savedCards])
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err); // выведем ошибку в консоль
  //     });
  // }

  // function handleDeleteMovie({ id }) {
  //   const cardForDelete = savedCards.find(
  //     (card) => card.movieId || card.id === id
  //   );
  //   deleteMovieApi(cardForDelete._id)
  //     .then((res) => {
  //       console.log(res);
  //       setSavedCards(savedCards.filter((el) => el !== cardForDelete));
  //       localStorage.setItem(
  //         'savedCards',
  //         JSON.stringify(savedCards.filter((el) => el !== cardForDelete))
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err); // выведем ошибку в консоль
  //     });
  // }

  const toggleIsShortsSaved = () => {
    setIsShortsSaved(!isShortsSaved);
    localStorage.setItem('isShortsSaved', !isShortsSaved);
  };

  const searchSavedMovies = useCallback(() => {
    const search = localStorage.getItem('searchInSavedText') || '';
    console.log(search);
    let finded;
    if (!search) {
      finded = cards;
      setFoundSavedCards(finded);
      localStorage.setItem('foundSavedCards', JSON.stringify(finded));
    } else {
      finded = cards.filter((el) =>
        el.nameRU.toLowerCase().includes(search.toLowerCase())
      );
      setFoundSavedCards(finded);
      localStorage.setItem('foundSavedCards', JSON.stringify(finded));
    }

    if (isShortsSaved) {
      const filtered = finded.filter((el) => el.duration <= SHORTS_DURATION);
      setFoundSavedCards(filtered);
      localStorage.setItem('foundSavedCards', JSON.stringify(filtered));
    }
  }, [isShortsSaved, cards]);

  useEffect(() => {
    getCards();
    if ('isShortsSaved' in localStorage) {
      setIsShortsSaved(JSON.parse(localStorage.getItem('isShortsSaved')));
    }
  }, [getCards]);

  useEffect(() => {
    searchSavedMovies();
  }, [searchSavedMovies]);

  return (
    <main className="saved">
      <SearchForm
        isChecked={isShortsSaved}
        onSearch={searchSavedMovies}
        onChangeFilter={toggleIsShortsSaved}
      />
      <MoviesCardList cards={foundSavedCards} onDelete={onDelete} />
      <div className="saved__placeholder"></div>
    </main>
  );
};

export default SavedMovies;
