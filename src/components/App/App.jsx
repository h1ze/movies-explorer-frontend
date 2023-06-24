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

function App() {
  const savedMovies = [...movies].filter((el) => el.saved);

  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    setCards(movies);
    setSavedCards(savedMovies);
  }, [savedMovies]);

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Layout />}>
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
    </div>
  );
}

export default App;
