import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import Layout from '../Layout/Layout';
import Menu from '../Menu/Menu';
import Preloader from '../Preloader/Preloader';
import {
  deleteMovieApi,
  getUserApi,
  loginApi,
  logoutApi,
  registerUserApi,
  saveMovieApi,
  updateUserApi,
  getMoviesApi,
} from '../../utils/MainApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [savedCards, setSavedCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isErrorResponse, setIsErrorResponse] = useState('');

  const [isCardsError, setIsCardsError] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function getUser() {
    setLoading(true);
    if ('currentUser' in localStorage) {
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
      setLoggedIn(true);
      setLoading(false);
    } else {
      getUserApi()
        .then((responseUserData) => {
          setCurrentUser(responseUserData.data);
          localStorage.setItem(
            'currentUser',
            JSON.stringify(responseUserData.data)
          );
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const getSavedCards = useCallback(() => {
    if ('savedCards' in localStorage) {
      setSavedCards(JSON.parse(localStorage.getItem('savedCards')));
    } else {
      getMoviesApi()
        .then((responseSavedMovies) => {
          setIsCardsError(false);
          setSavedCards(responseSavedMovies.data);
          localStorage.setItem(
            'savedCards',
            JSON.stringify(responseSavedMovies.data)
          );
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
          setIsCardsError(true);
        });
    }
  }, []);

  function handleRegister(registerData) {
    setIsSending(true);
    registerUserApi(registerData)
      .then((responseUserData) => {
        // Здесь мы получаем данные зарегистрированного пользователя
        setCurrentUser(responseUserData.data);
        // Передаем данные в апи логина
        handleLogin(registerData);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsErrorResponse(err);
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  function handleLogin(loginData) {
    setIsSending(true);
    loginApi(loginData)
      .then(() => {
        getUser();
        getSavedCards();
        navigate('/movies', { replace: true });
        setIsErrorResponse(false);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsErrorResponse(err);
      })
      .finally(() => {
        setIsSending(false);
      });
  }

  function handleUpdateUser(userData) {
    setLoading(true);
    setIsSending(true);
    updateUserApi(userData)
      .then((responseUserData) => {
        setIsErrorResponse(false);
        setCurrentUser(responseUserData.data);
        localStorage.setItem(
          'currentUser',
          JSON.stringify(responseUserData.data)
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsErrorResponse(err);
      })
      .finally(() => {
        setLoading(false);
        setIsSending(false);
      });
  }

  function handleLogout() {
    logoutApi()
      .then(() => {
        localStorage.clear();
        setLoggedIn(false);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsErrorResponse(err);
      });
  }

  function handleSaveMovie(movieData) {
    saveMovieApi(movieData)
      .then((resMovieData) => {
        setIsCardsError(false);
        setSavedCards([resMovieData.data, ...savedCards]);
        localStorage.setItem(
          'savedCards',
          JSON.stringify([resMovieData.data, ...savedCards])
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsCardsError(true);
      });
  }

  function handleDeleteMovie(card) {
    const searchID = card.id ? card.id : card.movieId;
    const cardForDelete = savedCards.find((savedCard) => {
      return savedCard.movieId === searchID;
    });

    deleteMovieApi(cardForDelete._id)
      .then((res) => {
        console.log(res);
        setIsCardsError(false);
        localStorage.setItem(
          'savedCards',
          JSON.stringify(
            savedCards.filter((el) => el._id !== cardForDelete._id)
          )
        );
        setSavedCards(savedCards.filter((el) => el._id !== cardForDelete._id));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsCardsError(true);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="page">
      {loading ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="/"
              element={
                <Layout onMenuClick={toggleMenu} isloggedIn={loggedIn} />
              }
            >
              <Route index element={<Main isloggedIn={loggedIn} />} />
              <Route
                path="movies"
                element={
                  <ProtectedRouteElement
                    element={Movies}
                    isloggedIn={loggedIn}
                    onSave={handleSaveMovie}
                    onDelete={handleDeleteMovie}
                    getSavedCards={getSavedCards}
                    isCardsError={isCardsError}
                  />
                }
              />
              <Route
                path="saved-movies"
                element={
                  <ProtectedRouteElement
                    element={SavedMovies}
                    isloggedIn={loggedIn}
                    cards={savedCards}
                    getSavedCards={getSavedCards}
                    onDelete={handleDeleteMovie}
                    isCardsError={isCardsError}
                  />
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRouteElement
                    element={Profile}
                    isloggedIn={loggedIn}
                    onSignout={handleLogout}
                    isErrorResponse={isErrorResponse}
                    OnUpdateUser={handleUpdateUser}
                    isSending={isSending}
                  />
                }
              />
              <Route
                path="signup"
                element={
                  <Register
                    onRegister={handleRegister}
                    isErrorResponse={isErrorResponse}
                    isloggedIn={loggedIn}
                    isSending={isSending}
                  />
                }
              />
              <Route
                path="signin"
                element={
                  <Login
                    onLogin={handleLogin}
                    isErrorResponse={isErrorResponse}
                    isloggedIn={loggedIn}
                    isSending={isSending}
                  />
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
        </CurrentUserContext.Provider>
      )}
    </div>
  );
}

export default App;
