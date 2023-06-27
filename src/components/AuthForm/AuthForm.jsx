import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './AuthForm.css';
import { REGEX_CHECK_NAME } from '../../utils/constants';
import { useFormWithValidation } from '../../utils/useFormWithValidation';

const AuthForm = ({ formData, onSubmit }) => {
  const isRegister = formData.name === 'register';
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    onSubmit(values);
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
                  !!errors.name ? 'auth-form__input_type_error' : ''
                } `}
                type="text"
                minLength="2"
                maxLength="30"
                value={values.name || ''}
                name="name"
                tabIndex="1"
                placeholder="Введите имя"
                required
                pattern={REGEX_CHECK_NAME}
                onChange={handleChange}
              />
              {!!errors.name && (
                <span className="auth-form__error">{errors.name}</span>
              )}
            </label>
          )}
          <label className="auth-form__label">
            E-mail
            <input
              id="profile-email"
              className={`auth-form__input ${
                !!errors.email ? 'auth-form__input_type_error' : ''
              } `}
              type="email"
              value={values.email || ''}
              name="email"
              tabIndex="2"
              placeholder="Введите почту"
              required
              onChange={handleChange}
            />
            {!!errors.email && (
              <span className="auth-form__error">{errors.email}</span>
            )}
          </label>
          <label className="auth-form__label">
            Пароль
            <input
              id="profile-password"
              className={`auth-form__input ${
                !!errors.password ? 'auth-form__input_type_error' : ''
              } `}
              type="password"
              minLength="2"
              maxLength="30"
              value={values.password || ''}
              name="password"
              tabIndex="3"
              placeholder="Введите пароль"
              required
              onChange={handleChange}
            />
            {!!errors.password && (
              <span className="auth-form__error">{errors.password}</span>
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
