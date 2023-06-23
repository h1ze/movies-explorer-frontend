import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <>
      <div className="main-nav">
        <ul className="main-nav__links">
          <li>
            <Link
              to="movies"
              className="main-nav__link main-nav__link_weight_heavy"
            >
              Фильмы
            </Link>
          </li>
          <li>
            <Link to="saved-movies" className="main-nav__link main-nav__link">
              Сохраненные фильмы
            </Link>
          </li>
        </ul>
        <Link to="profile" className="main-nav__profile-link">
          Аккаунт
          <div className="main-nav__profile-icon"></div>
        </Link>
      </div>
      <button className="main-nav__burger-btn" type="button"></button>
    </>
  );
}

export default Navigation;
