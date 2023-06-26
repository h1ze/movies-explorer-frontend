import { Link, Route, Routes } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ onMenuClick }) {
  const paths = ['movies', 'saved-movies', 'profile'];
  return (
    <Routes>
      <Route
        path="/"
        element={
          <header className="header header_theme_dark">
            <div className="header__wrapper">
              <nav className="header__menu">
                <Logo />
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
          </header>
        }
      />
      {paths.map((path, index) => {
        return (
          <Route
            key={index}
            path={path}
            element={
              <header className="header">
                <div className="header__wrapper">
                  <nav className="header__menu">
                    <Logo />
                    <Navigation onMenuClick={onMenuClick} />
                  </nav>
                </div>
              </header>
            }
          />
        );
      })}
    </Routes>
  );
}

export default Header;
