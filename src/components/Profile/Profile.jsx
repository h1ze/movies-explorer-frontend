import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <section className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form" name="profile-form">
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              placeholder="Виталий"
              disabled
            ></input>
          </label>
          <div className="profile__line"></div>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              placeholder="pochta@yandex.ru"
              disabled
            ></input>
          </label>
        </form>
        <div className="profile__button-block">
          <button className="profile__button" type="button">
            Редактировать
          </button>
          <button
            className="profile__button profile__button_type_exit"
            type="button"
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
