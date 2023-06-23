import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <>
      <div className="main-nav">
        <ul className="main-nav__links">
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `main-nav__link ${
                  isActive ? 'main-nav__link_weight_heavy' : ''
                }`
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                `main-nav__link ${
                  isActive ? 'main-nav__link_weight_heavy' : ''
                }`
              }
            >
              Сохраненные фильмы
            </NavLink>
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
