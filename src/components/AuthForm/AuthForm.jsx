import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import Logo from '../Logo/Logo';
import './AuthForm.css';

const AuthForm = ({ formData, onSubmit }) => {
  const isRegister = formData.name === 'register';
  const [authFormInputsData, setAuthFormInputsData] = useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = useState(false);

  const handleInputs = (evt) => {
    setAuthFormInputsData({
      ...authFormInputsData,
      [evt.target.name]: evt.target.value,
    });
    setErrors({
      ...errors,
      [evt.target.name]: evt.target.validationMessage,
    });
    setIsValid(evt.target.closest('form').checkValidity());

    if (evt.target.name === 'email' && !isEmail(evt.target.value)) {
      setErrors({
        ...errors,
        email: 'Поле email должно соответствовать шаблону электронной почты',
      });
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setAuthFormInputsData(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setAuthFormInputsData, setErrors, setIsValid]
  );

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
                  !!errors.name ? 'auth-form__input_type_error' : ''
                } `}
                type="text"
                minLength="2"
                maxLength="30"
                value={authFormInputsData.name || ''}
                name="name"
                tabIndex="1"
                placeholder="Введите имя"
                required
                onChange={handleInputs}
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
              value={authFormInputsData.email || ''}
              name="email"
              tabIndex="2"
              placeholder="Введите почту"
              required
              onChange={handleInputs}
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
              value={authFormInputsData.password || ''}
              name="password"
              tabIndex="3"
              placeholder="Введите пароль"
              required
              onChange={handleInputs}
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
