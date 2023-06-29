import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ onMenuClick, isloggedIn }) {
  return (
    <header className={`header ${isloggedIn ? '' : 'header_theme_dark'}`}>
      <div className="header__wrapper">
        <nav className="header__menu">
          <Logo />
          {isloggedIn ? (
            <Navigation onMenuClick={onMenuClick} />
          ) : (
            <ul className="header__links">
              <li>
                <Link
                  className={`header__link ${
                    isloggedIn ? 'header__link_color_black' : ''
                  }`}
                  to="signup"
                >
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
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
