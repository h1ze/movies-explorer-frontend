import { Link, Route, Routes } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Header.css';

function Header() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="header">
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
    </Routes>
  );
}

export default Header;
