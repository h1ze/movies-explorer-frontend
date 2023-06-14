import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav>
      <ul className="movie_nav">
        <li className="movie_nav-item">
          <NavLink href="#" className="movie_nav-link" target="_blank">
            Фильмы
          </NavLink>
        </li>
        <li className="movie_nav-item">
          <NavLink href="#" className="movie_nav-link" target="_blank">
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
      <ul className="user_nav">
        <li className="user_nav-item">
          <NavLink href="#" className="user_nav-link" target="_blank">
            Аккаунт
          </NavLink>
        </li>
      </ul>
      {/* <ul className="entry_nav">
        <li className="entry_nav-item">
          <NavLink href="#" className="entry_nav-link" target="_blank">
            Регистрация
          </NavLink>
        </li>
        <li className="entry_nav-item">
          <NavLink href="#" className="entry_nav-link" target="_blank">
            Войти
          </NavLink>
        </li>
      </ul> */}
    </nav>
  );
}

export default Navigation;
