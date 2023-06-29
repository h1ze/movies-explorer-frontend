import React, { useState } from 'react';
import './Profile.css';
import ReqError from '../ReqError/ReqError';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { REGEX_CHECK_NAME } from '../../utils/constants';

const Profile = ({ onSignout }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [isDisable, setIsDisable] = useState(true);
  const [isReqError, setIsReqError] = useState(false);

  const handleEdit = () => {
    setIsDisable(!isDisable);
  };

  const handleSubmit = () => {
    console.log('Сабмит профиля');
  };

  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" name="profile-form">
          <label className="profile__label">
            Имя
            <input
              id="profile-name"
              className={`profile__input ${
                !!errors.name ? 'profile__input_type_error' : ''
              } `}
              type="text"
              minLength="2"
              maxLength="30"
              name="name"
              value={values.name || ''}
              placeholder="Виталий"
              disabled={isDisable}
              onChange={handleChange}
              required
              pattern={REGEX_CHECK_NAME}
            ></input>
            {!!errors.name && (
              <span className="profile-input__error">{errors.name}</span>
            )}
          </label>
          <div className="profile__line"></div>
          <label className="profile__label">
            E-mail
            <input
              id="profile-email"
              className={`profile__input ${
                !!errors.email ? 'profile__input_type_error' : ''
              } `}
              name="email"
              value={values.email || ''}
              placeholder="pochta@yandex.ru"
              disabled={isDisable}
              onChange={handleChange}
              required
            ></input>
            {!!errors.email && (
              <span className="profile-input__error">{errors.email}</span>
            )}
          </label>
        </form>
        <ReqError isReqError={isReqError}>
          При авторизации профиля произошла ошибка, токен не передан или передан
          не в том формате
        </ReqError>
        {!isDisable ? (
          <button
            className="profile__save"
            onClick={handleSubmit}
            disabled={isReqError || !isValid}
          >
            Сохранить
          </button>
        ) : (
          <ul className="profile__button-block">
            <li>
              <button
                className="profile__button"
                type="button"
                onClick={handleEdit}
              >
                Редактировать
              </button>
            </li>
            <li>
              <button
                className="profile__button profile__button_type_exit"
                type="button"
                onClick={onSignout}
              >
                Выйти из аккаунта
              </button>
            </li>
          </ul>
        )}
      </div>
    </main>
  );
};

export default Profile;
