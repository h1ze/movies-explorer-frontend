import React, { useContext, useState } from 'react';
import './Profile.css';
import ReqError from '../ReqError/ReqError';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { REGEX_CHECK_NAME } from '../../utils/constants';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Profile = ({ OnUpdateUser, onSignout, isErrorResponse }) => {
  const [isDisable, setIsDisable] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const handleEdit = () => {
    setIsDisable(!isDisable);
  };

  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation();

  const handleSubmit = () => {
    setIsSending(true);
    OnUpdateUser(values);
    if (!isErrorResponse) {
      handleEdit();
    }
  };

  React.useEffect(() => {
    if (
      currentUser.email !== values.email ||
      currentUser.name !== values.name
    ) {
      setIsChanged(true);
    } else setIsChanged(false);
  }, [currentUser, values]);

  React.useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser, setValues]);

  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
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
              placeholder="Укажите имя"
              disabled={isDisable || isSending}
              onChange={handleChange}
              required
              pattern={REGEX_CHECK_NAME}
              autoComplete="off"
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
              placeholder="Укажите почту"
              disabled={isDisable || isSending}
              onChange={handleChange}
              required
              autoComplete="off"
            ></input>
            {!!errors.email && (
              <span className="profile-input__error">{errors.email}</span>
            )}
          </label>
        </form>
        <ReqError isErrorResponse={isErrorResponse}></ReqError>
        {!isDisable ? (
          <button
            className="profile__save"
            onClick={handleSubmit}
            disabled={!isValid || !isChanged || isSending}
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
