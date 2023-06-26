import { MAIN_API_BASE_URL, REQUEST_HEADERS } from './constants';
import checkResponse from './checkResponse';

export function getUserApi() {
  return fetch(`${MAIN_API_BASE_URL}/users/me`, {
    headers: {
      ...REQUEST_HEADERS,
      // Accept: 'application/json',
    },
  }).then((response) => this._checkResponse(response));
}

export function registerUserApi(registerData) {
  return fetch(`${MAIN_API_BASE_URL}/signup`, {
    method: 'POST',
    headers: REQUEST_HEADERS,
    body: JSON.stringify({
      password: registerData.password, // Здесь нужно забрать пароль пользователя из формы регистрации
      email: registerData.email, // Здесь нужно забрать почту пользователя из формы регистрации
    }),
  }).then((response) => checkResponse(response));
}
