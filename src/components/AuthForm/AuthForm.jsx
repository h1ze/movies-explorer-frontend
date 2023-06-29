import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';
import './AuthForm.css';
import { REGEX_CHECK_NAME } from '../../utils/constants';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import ReqError from '../ReqError/ReqError';

const AuthForm = ({ formData, onSubmit, isErrorResponse }) => {
  const [isReqError, setIsReqError] = useState(false);

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
                id="auth-name"
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
              <span
                className={`auth-form__error ${
                  !!errors.name ? 'auth-form__error_active' : ''
                } `}
              >
                {errors.name}
              </span>
            </label>
          )}
          <label className="auth-form__label">
            E-mail
            <input
              id="auth-email"
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
            <span
              className={`auth-form__error ${
                !!errors.email ? 'auth-form__error_active' : ''
              } `}
            >
              {errors.email}
            </span>
          </label>
          <label
            className={`auth-form__label auth-form__label_type_${formData.name}`}
          >
            Пароль
            <input
              id="auth-password"
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
            <span
              className={`auth-form__error ${
                !!errors.password ? 'auth-form__error_active' : ''
              } `}
            >
              {errors.password}
            </span>
          </label>
          <ReqError isReqError={isErrorResponse}>
            При авторизации профиля произошла ошибка, токен не передан или
            передан не в том формате
          </ReqError>
          <button
            className="auth-form__button"
            type="submit"
            disabled={!isValid}
          >
            {formData.buttonTitle}
          </button>
        </form>
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
