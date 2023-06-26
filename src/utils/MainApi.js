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
      // Забираем данные пользователя из формы регистрации
      password: registerData.password,
      email: registerData.email,
      name: registerData.name,
    }),
  }).then((response) => checkResponse(response));
}
