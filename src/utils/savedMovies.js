import movies from './movies';

const savedMovies = movies.filter((el) => el.saved);

export default savedMovies;
