import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isMenu, onMenuClick }) {
  return (
    <>
      <div className={`main-nav ${isMenu ? 'main-nav_type__menu' : ''}`}>
        <ul className="main-nav__links">
          {isMenu && (
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `main-nav__link ${isActive ? 'main-nav__link_active' : ''}`
                }
              >
                Главная
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `main-nav__link ${isActive ? 'main-nav__link_active' : ''}`
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                `main-nav__link ${isActive ? 'main-nav__link_active' : ''}`
              }
            >
              Сохраненные фильмы
            </NavLink>
          </li>
        </ul>
        <Link to="/profile" className="main-nav__profile-link">
          Аккаунт
          <div className="main-nav__profile-icon"></div>
        </Link>
      </div>
      {!isMenu && (
        <button
          className="main-nav__burger-btn"
          type="button"
          onClick={onMenuClick}
        ></button>
      )}
    </>
  );
}

export default Navigation;
