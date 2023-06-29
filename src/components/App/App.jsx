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
import { getUserApi, loginApi, registerUserApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isErrorResponse, setIsErrorResponse] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getUserApi()
      .then((responseUserData) => {
        setCurrentUser(responseUserData.data);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, [navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function handleRegisterSubmit(registerData) {
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
        setIsErrorResponse(err.message);
      });
  }

  function handleLogin(loginData) {
    loginApi(loginData)
      .then(() => {
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        setIsErrorResponse(err.message);
      });
  }

  useEffect(() => {
    setCards(movies);
    setSavedCards(savedMovies);
    setIsLoading(false);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Layout onMenuClick={toggleMenu} />}>
            <Route index element={<Main />} />
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
                />
              }
            />
            <Route
              path="signup"
              element={
                <Register
                  onRegister={handleRegisterSubmit}
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
        {isLoading && <Preloader />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
