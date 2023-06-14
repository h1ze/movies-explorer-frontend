import { Link, Route, Routes } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';

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
                <Navigation />
              </nav>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default Header;
