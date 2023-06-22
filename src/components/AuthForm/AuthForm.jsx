import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './AuthForm.css';

const AuthForm = ({ formData }) => {
  const isRegister = formData.name === 'register';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputNameHandler = (evt) => {
    setName(evt.target.value);
  };

  const inputEmailHandler = (evt) => {
    setEmail(evt.target.value);
  };

  const inputPasswordlHandler = (evt) => {
    setPassword(evt.target.value);
  };

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <Logo />
        <h1 className="auth-form__title">{formData.title}</h1>
        <form
          className="auth-form__form"
          name={`${formData.name}-form`}
          //   onSubmit={formData.onSubmit}
        >
          {isRegister && (
            <label className="auth-form__label">
              Имя
              <input
                id="profile-name"
                className="auth-form__input"
                type="text"
                value={name}
                name="name"
                tabIndex="1"
                placeholder="Виталий"
                required
                onChange={inputNameHandler}
              />
            </label>
          )}
          <label className="auth-form__label">
            E-mail
            <input
              id="profile-email"
              className="auth-form__input"
              type="email"
              value={email}
              name="email"
              tabIndex="2"
              placeholder="pochta@yandex.ru|"
              required
              onChange={inputEmailHandler}
            />
          </label>
          {isRegister ? (
            <label className="auth-form__label">
              Пароль
              <input
                id="profile-password"
                className="auth-form__input auth-form__input_type_error"
                type="password"
                value={password}
                name="password"
                tabIndex="3"
                placeholder="••••••••••••••"
                required
                onChange={inputPasswordlHandler}
              />
              <span className="auth-form__error">Что-то пошло не так...</span>
            </label>
          ) : (
            <label className="auth-form__label">
              Пароль
              <input
                id="profile-password"
                className="auth-form__input"
                type="password"
                value={password}
                name="password"
                tabIndex="3"
                required
                onChange={inputPasswordlHandler}
              />
            </label>
          )}

          <button className={`auth-form__button`} type="submit">
            {formData.buttonTitle}
          </button>
        </form>
        {isRegister ? (
          <div className="auth-form__link-block">
            <p className="auth-form__text">Уже зарегистрированы?</p>
            <Link className="auth-form__link" to="/signin">
              Войти
            </Link>
          </div>
        ) : (
          <div className="auth-form__link-block">
            <p className="auth-form__text">Ещё не зарегистрированы?</p>
            <Link className="auth-form__link" to="signup">
              Регистрация
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthForm;
