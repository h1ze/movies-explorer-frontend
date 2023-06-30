import { MAIN_API_BASE_URL, REQUEST_HEADERS } from './constants';
import checkResponse from './checkResponse';

export function getUserApi() {
  return fetch(`${MAIN_API_BASE_URL}/users/me`, {
    credentials: 'include', // отправляем куки вместе с запросом
    headers: {
      ...REQUEST_HEADERS,
      Accept: 'application/json',
    },
  }).then((response) => checkResponse(response));
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

export function loginApi(loginData) {
  return fetch(`${MAIN_API_BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include', // отправляем куки вместе с запросом
    headers: REQUEST_HEADERS,
    body: JSON.stringify({
      // Забираем данные пользователя из формы логина или получаем после регистрации
      password: loginData.password,
      email: loginData.email,
    }),
  }).then((response) => checkResponse(response));
}

export function logoutApi() {
  return fetch(`${MAIN_API_BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include', // отправляем куки вместе с запросом
    headers: REQUEST_HEADERS,
  }).then((response) => checkResponse(response));
}

export function updateUserApi(userData) {
  return fetch(`${MAIN_API_BASE_URL}//users/me`, {
    method: 'PATCH',
    credentials: 'include', // отправляем куки вместе с запросом
    headers: REQUEST_HEADERS,
    body: JSON.stringify({
      // Забираем данные пользователя из формы профиля
      name: userData.name,
      email: userData.email,
    }),
  }).then((response) => checkResponse(response));
}
