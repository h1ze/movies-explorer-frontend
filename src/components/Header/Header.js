import { Link, Route, Routes } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

function Header() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="header header_theme_dark">
            <div className="header__wrapper">
              <nav className="header__menu">
                <Link to="/">
                  <img src={logo} className="header__logo" alt="Логотип" />
                </Link>
                <ul className="header__links">
                  <li>
                    <Link className="header__link" to="signup">
                      Регистрация
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="header__link header__link_type_button"
                      to="signin"
                    >
                      Войти
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        }
      />
      <Route
        path="movies"
        element={
          <div className="header">
            <div className="header__wrapper">
              <nav className="header__menu">
                <Link to="/">
                  <img src={logo} className="header__logo" alt="Логотип" />
                </Link>
                <div className="header__links-container">
                  <ul className="header__movies-links">
                    <li>
                      <Link
                        to="movies"
                        className="header__movies-link"
                        target="_blank"
                      >
                        Фильмы
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="saved-movies"
                        className="header__movies-link"
                        target="_blank"
                      >
                        Сохраненные фильмы
                      </Link>
                    </li>
                  </ul>
                  <Link to="profile" className="header__profile-link">
                    Аккаунт
                    <div className="header__profile-icon"></div>
                  </Link>
                </div>
                <button className="header__burger-btn"></button>
              </nav>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default Header;
