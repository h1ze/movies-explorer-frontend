import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, json } from 'react-router-dom';
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
  getUserApi,
  loginApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
} from '../../utils/MainApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { getMoviesApi } from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [findedMovies, setFindedMovies] = useState([]);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isErrorResponse, setIsErrorResponse] = useState('');
  const [isShortsMovies, setIsShortsMovies] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function getUser() {
    getUserApi()
      .then((responseUserData) => {
        setCurrentUser(responseUserData.data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleRegister(registerData) {
    registerUserApi(registerData)
      .then((responseUserData) => {
        // Здесь мы получаем данные зарегистрированного пользователя
        console.log(responseUserData.data);
        setCurrentUser(responseUserData.data);
        // Передаем данные в апи логина
        handleLogin(registerData);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsErrorResponse(err);
        console.log(isErrorResponse);
      });
  }

  function handleLogin(loginData) {
    loginApi(loginData)
      .then(() => {
        getUser();
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsErrorResponse(err);
      });
  }

  function handleUpdateUser(userData) {
    updateUserApi(userData)
      .then((responseUserData) => {
        console.log(responseUserData);
        setCurrentUser(responseUserData.data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsErrorResponse(err);
      });
  }

  function handleLogout() {
    logoutApi()
      .then(() => {
        setLoggedIn(false);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsErrorResponse(err.message);
      });
  }

  function getMovies() {
    getMoviesApi().then((resMovies) => {
      localStorage.setItem('movies', JSON.stringify(resMovies));
      // setMovies(JSON.parse(localStorage.getItem('movies')));
      setMovies(resMovies);
    });
  }

  // function searchMovies(searchText) {
  //   const handleSearchMovies = useCallback(() => {
  //     setCards(
  //       movies.filter((el) =>
  //         el.nameRU.toLowerCase().includes(searchText.toLowerCase())
  //       )
  //     );
  //   }, []);

  // } else {
  //   setCards(allFindedMovies);
  // }

  // }

  // const handleSearchMovies = useCallback(
  //   (searchText) => {
  //     const searched = movies.filter((el) =>
  //       el.nameRU.toLowerCase().includes(searchText.toLowerCase())
  //     );
  //     setFindedMovies(searched);
  //     localStorage.setItem('findedMovies', JSON.stringify(searched));
  //     console.log(searched);
  //     if (isShortsMovies) {
  //       const filteredMovies = searched.filter((el) => el.duration <= 40);
  //       console.log(filteredMovies);
  //       setCards(filteredMovies);
  //       localStorage.setItem('cards', JSON.stringify(filteredMovies));
  //     } else {
  //       setCards(searched);
  //       localStorage.setItem('cards', JSON.stringify(searched));
  //     }
  //   },
  //   [movies, isShortsMovies]
  // );

  const setRenderedCards = useCallback((elements) => {
    if (localStorage.getItem('isShortsMovies') === 'true') {
      const filtered = elements.filter((el) => el.duration <= 40);
      setCards(filtered);
    } else {
      setCards(elements);
    }
  }, []);

  const handleSearchMovies = useCallback(
    (searchText) => {
      const searched = movies.filter((el) =>
        el.nameRU.toLowerCase().includes(searchText.toLowerCase())
      );
      localStorage.setItem('findedMovies', JSON.stringify(searched));
      setRenderedCards(searched);
    },
    [movies, setRenderedCards]
  );

  const toggleDuration = useCallback(() => {
    setIsShortsMovies(!isShortsMovies);
    localStorage.setItem('isShortsMovies', !isShortsMovies);

    if ('findedMovies' in localStorage) {
      setRenderedCards(JSON.parse(localStorage.getItem('findedMovies')));
    }
  }, [isShortsMovies, setRenderedCards]);

  // const toggleDuration = () => {
  //   setIsShortsMovies(!isShortsMovies);
  // localStorage.setItem('isShortsMovies', !isShortsMovies);

  // if ('findedMovies' in localStorage) {
  //   const searched = JSON.parse(localStorage.getItem('findedMovies'));
  //   console.log(searched);
  //   const filtered = searched.filter((el) => el.duration <= 40);
  //   console.log(filtered);
  //   if (isShortsMovies) {
  //     setCards(filtered);
  //   } else {
  //     setCards(searched);
  //   }
  // }
  // };

  useEffect(() => {
    // toggleDuration();
    // setDurationLocal();
    // console.log(localStorage.getItem('isShorts'));
  }, []);

  useEffect(() => {
    if ('movies' in localStorage) {
      setMovies(JSON.parse(localStorage.getItem('movies')));
    }

    if (localStorage.getItem('isShortsMovies') === 'true') {
      // toggleDuration();
      setIsShortsMovies(true);
    }

    // if ('cards' in localStorage) {
    //   setCards(JSON.parse(localStorage.getItem('cards')));
    // }
  }, [isShortsMovies]);

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
                    cards={cards}
                    onSearch={handleSearchMovies}
                    onFilterDuration={toggleDuration}
                    isShortsMovies={isShortsMovies}
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
                  />
                }
              />
              <Route
                path="signin"
                element={
                  <Login
                    onLogin={handleLogin}
                    isErrorResponse={isErrorResponse}
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
