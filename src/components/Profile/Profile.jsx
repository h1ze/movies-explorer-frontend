import React, { useState } from 'react';
import './Profile.css';
import ReqError from '../ReqError/ReqError';

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState(false);

  const editHandler = () => {
    setIsEdit(!isEdit);
  };

  const errorHandler = () => {
    setIsError(!isError);
    resetStates();
  };

  const resetStates = () => {
    setTimeout(() => {
      setIsError(false);
      setIsEdit(false);
    }, 5000);
  };

  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" name="profile-form">
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              placeholder="Виталий"
              disabled={isEdit}
            ></input>
          </label>
          <div className="profile__line"></div>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              placeholder="pochta@yandex.ru"
              disabled={isEdit}
            ></input>
          </label>
        </form>
        {isError && (
          <ReqError>При обновлении профиля произошла ошибка.</ReqError>
        )}
        {!!isEdit ? (
          <button
            className="profile__save"
            onClick={errorHandler}
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
                onClick={editHandler}
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
