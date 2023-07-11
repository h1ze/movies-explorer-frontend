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
  const [savedCards, setSavedCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isErrorResponse, setIsErrorResponse] = useState('');

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
      getMoviesApi().then((responseSavedMovies) => {
        setSavedCards(responseSavedMovies.data);
        localStorage.setItem(
          'savedCards',
          JSON.stringify(responseSavedMovies.data)
        );
      });
    }
  }, []);

  function handleRegister(registerData) {
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
      });
  }

  function handleLogin(loginData) {
    loginApi(loginData)
      .then(() => {
        getUser();
        getSavedCards();
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsErrorResponse(err);
      });
  }

  function handleUpdateUser(userData) {
    setLoading(true);
    updateUserApi(userData)
      .then((responseUserData) => {
        console.log(responseUserData);
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
        setSavedCards([resMovieData.data, ...savedCards]);
        localStorage.setItem(
          'savedCards',
          JSON.stringify([resMovieData.data, ...savedCards])
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleDeleteMovie(card) {
    // const cardForDelete = savedCards.find((card) => {
    //   console.log(console.log(card.movieId || card.id, id));
    //   return card.movieId || card.id === id;
    // });

    const searchID = card.id ? card.id : card.movieId;
    const cardForDelete = savedCards.find((savedCard) => {
      console.log(
        `savedCard.movieId ${savedCard.movieId}  card.id ${card.id} card.movieId ${card.movieId}, searchID ${searchID}`
      );

      return savedCard.movieId === searchID;
    });

    deleteMovieApi(cardForDelete._id)
      .then((res) => {
        console.log(res);
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
