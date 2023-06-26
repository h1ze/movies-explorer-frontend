import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const menuOpenHandler = () => {
    setIsMenuOpen(true);
  };

  const menuCloseHandler = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setCards(movies);
    setSavedCards(savedMovies);
    setIsLoading(false);
  }, []);

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Layout onMenuClick={menuOpenHandler} />}>
          <Route index element={<Main />} />
          <Route path="movies" element={<Movies cards={cards} />} />
          <Route
            path="saved-movies"
            element={<SavedMovies cards={savedCards} />}
          />
          <Route path="signup" element={<Register />} />
          <Route path="signin" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Menu isOpen={isMenuOpen} onClose={menuCloseHandler} />
      {isLoading && <Preloader />}
    </div>
  );
}

export default App;
