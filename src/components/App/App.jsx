import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="movies" element={<Movies />} />
        <Route path="saved-movies" element={<SavedMovies />} />
      </Routes>
    </div>
  );
}

export default App;
