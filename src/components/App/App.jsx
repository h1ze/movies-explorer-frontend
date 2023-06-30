import { useEffect, useState } from 'react';
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
import movies from '../../utils/movies';
import savedMovies from '../../utils/savedMovies';
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

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isErrorResponse, setIsErrorResponse] = useState('');

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

  // useEffect(() => {
  //   setCards(movies);
  //   setSavedCards(savedMovies);
  // }, []);

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
