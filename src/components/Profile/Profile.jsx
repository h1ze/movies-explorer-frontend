import React, { useState } from 'react';
import './Profile.css';
import ReqError from '../ReqError/ReqError';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { REGEX_CHECK_NAME } from '../../utils/constants';

const Profile = () => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const [isDisable, setIsDisable] = useState(true);
  const [isError, setIsError] = useState(false);

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
              className={`profile__input ${
                !!errors.name ? 'profile__input_type_error' : ''
              } `}
              name="name"
              value={values.name}
              placeholder="Виталий"
              disabled={isDisable}
              onChange={handleChange}
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
              className={`profile__input ${
                !!errors.email ? 'profile__input_type_error' : ''
              } `}
              name="email"
              value={values.email}
              placeholder="pochta@yandex.ru"
              disabled={isDisable}
              onChange={handleChange}
            ></input>
            {!!errors.email && (
              <span className="profile-input__error">{errors.email}</span>
            )}
          </label>
        </form>
        {isError && (
          <ReqError>При обновлении профиля произошла ошибка.</ReqError>
        )}
        {!isDisable ? (
          <button
            className="profile__save"
            onClick={handleSubmit}
            disabled={isError}
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
