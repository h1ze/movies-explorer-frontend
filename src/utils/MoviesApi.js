import checkResponse from './checkResponse';
import { MOVIES_API__BASE_URL, REQUEST_HEADERS } from './constants';

export function getMoviesApi() {
  return fetch(`${MOVIES_API__BASE_URL}/users/me`, {
    headers: REQUEST_HEADERS,
  }).then((response) => checkResponse(response));
}
