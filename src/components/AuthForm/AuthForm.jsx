import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './AuthForm.css';

const AuthForm = ({ formData, children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const inputNameHandler = (evt) => {
    setName(evt.target.value);
  };

  const inputEmailHandler = (evt) => {
    setEmail(evt.target.value);
  };

  return (
    <section className="auth-form">
      <div className="auth-form__container">
        <Logo />
        <h1 className="auth-form__title">Рады видеть!</h1>
        <form
          className="auth-form__form"
          //   name={`${formData.name}-form`}
          //   onSubmit={formData.onSubmit}
        >
          {children}
          <label className="auth-form__label">
            Имя
            <input
              id="profile-name"
              className="auth-form__input"
              type="text"
              value={name}
              name="name"
              tabIndex="1"
              placeholder=""
              required
              onChange={inputNameHandler}
            />
          </label>
          <label className="auth-form__label">
            E-mail
            <input
              id="profile-email"
              className="auth-form__input"
              type="email"
              value={email}
              name="email"
              tabIndex="2"
              placeholder=""
              required
              onChange={inputEmailHandler}
            />
          </label>

          <button className={`auth-form__button`} type="submit">
            {/* {formData.buttonTitle} */}
            Зарегистрироваться
          </button>
        </form>
        <div className="auth-form__link-block">
          <p className="auth-form__text">Уже зарегистрированы?</p>
          <Link className="auth-form__link" to="/sign-in">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
