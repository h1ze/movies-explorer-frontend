import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './AuthForm.css';

const AuthForm = ({ formData, onSubmit }) => {
  const isRegister = formData.name === 'register';

  const [authFormInputsData, setAuthFormInputsData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputs = (evt) => {
    setAuthFormInputsData({
      ...authFormInputsData,
      [evt.target.name]: evt.target.value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit(authFormInputsData);
  }

  return (
    <main className="auth-form">
      <div className="auth-form__container">
        <Logo />
        <h1 className="auth-form__title">{formData.title}</h1>
        <form
          className="auth-form__form"
          name={`${formData.name}-form`}
          onSubmit={handleSubmit}
        >
          {isRegister && (
            <label className="auth-form__label">
              Имя
              <input
                id="profile-name"
                className="auth-form__input"
                type="text"
                value={authFormInputsData.name}
                name="name"
                tabIndex="1"
                placeholder="Виталий"
                required
                onChange={handleInputs}
              />
            </label>
          )}
          <label className="auth-form__label">
            E-mail
            <input
              id="profile-email"
              className="auth-form__input"
              type="email"
              value={authFormInputsData.email}
              name="email"
              tabIndex="2"
              placeholder="pochta@yandex.ru|"
              required
              onChange={handleInputs}
            />
          </label>
          {isRegister ? (
            <label className="auth-form__label">
              Пароль
              <input
                id="profile-password"
                className="auth-form__input auth-form__input_type_error"
                type="password"
                value={authFormInputsData.password}
                name="password"
                tabIndex="3"
                placeholder="••••••••••••••"
                required
                onChange={handleInputs}
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
                value={authFormInputsData.password}
                name="password"
                tabIndex="3"
                required
                onChange={authFormInputsData.password}
              />
            </label>
          )}
          <button
            className={`auth-form__button auth-form__button_type_${formData.name}`}
            type="submit"
          >
            {formData.buttonTitle}
          </button>
        </form>
        {/* При получении ошибки от сервера текст ошибки будет передаваться в ReqError
          {isError && (
          <ReqError></ReqError>
        )} */}
        <div className="auth-form__link-block">
          <p className="auth-form__text">{formData.text}</p>
          <Link className="auth-form__link" to={formData.link}>
            {formData.linkText}
          </Link>
        </div>
      </div>
    </main>
  );
};

export default AuthForm;
