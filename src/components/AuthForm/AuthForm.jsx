import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './AuthForm.css';

const AuthForm = ({ formData, onSubmit }) => {
  const isRegister = formData.name === 'register';
  const [hasErrorInput, setHasErrorInput] = useState(false);

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
                className={`auth-form__input ${
                  hasErrorInput ? 'auth-form__input_type_error' : ''
                } `}
                type="text"
                value={authFormInputsData.name}
                name="name"
                tabIndex="1"
                placeholder="Введите имя"
                required
                onChange={handleInputs}
              />
              {hasErrorInput && (
                <span className="auth-form__error">Что-то пошло не так...</span>
              )}
            </label>
          )}
          <label className="auth-form__label">
            E-mail
            <input
              id="profile-email"
              className={`auth-form__input ${
                hasErrorInput ? 'auth-form__input_type_error' : ''
              } `}
              type="email"
              value={authFormInputsData.email}
              name="email"
              tabIndex="2"
              placeholder="Введите почту"
              required
              onChange={handleInputs}
            />
            {hasErrorInput && (
              <span className="auth-form__error">Что-то пошло не так...</span>
            )}
          </label>
          <label className="auth-form__label">
            Пароль
            <input
              id="profile-password"
              className={`auth-form__input ${
                hasErrorInput ? 'auth-form__input_type_error' : ''
              } `}
              type="password"
              value={authFormInputsData.password}
              name="password"
              tabIndex="3"
              placeholder="Введите пароль"
              required
              onChange={handleInputs}
            />
            {hasErrorInput && (
              <span className="auth-form__error">Что-то пошло не так...</span>
            )}
          </label>
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
