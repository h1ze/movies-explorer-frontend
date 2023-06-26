class Api {
  constructor(options) {
    // тело конструктора
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  setProfileData(profileFormData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileFormData.name, // Здесь нужно забрать имя пользователя из формы
        about: profileFormData.about, // Здесь нужно забрать информацию о пользователе из формы
      }),
    }).then((response) => this._checkResponse(response));
  }

  setNewCard(newCardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newCardData.name, // Здесь нужно забрать название карточки из формы
        link: newCardData.link, // Здесь нужно забрать ссылку на изображение из формы
      }),
    }).then((response) => this._checkResponse(response));
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  // addLike(cardID) {
  //     return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
  //         method: 'PUT',
  //         headers: this._headers,
  //     })
  //         .then(response => this._checkResponse(response));
  // };

  // removeLike(cardID) {
  //     return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
  //         method: 'DELETE',
  //         headers: this._headers,
  //     })
  //         .then(response => this._checkResponse(response));
  // };

  changeLikeCardStatus(cardID, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  setAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar, // Здесь должна быть ссылка на новый аватар
      }),
    }).then((response) => this._checkResponse(response));
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  }
}

// Создание экземпляра класса API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '01eb8e66-73ce-49ed-89f5-929714990adb',
    'Content-Type': 'application/json',
  },
});

export default api;


// АВТОРИЗАЦИЯ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

class Auth {
    constructor(options) {
        // тело конструктора
        this._options = options;
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
      }

    sendRegister(registrationData) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": registrationData.password, // Здесь нужно забрать пароль пользователя из формы регистрации
                "email": registrationData.email, // Здесь нужно забрать почту пользователя из формы регистрации
              })
        })
            .then(response => this._checkResponse(response));
    }

    // Пример ответа при отправке данных регистрации
    // {
    //     "data": {
    //         "_id": "5f5204c577488bcaa8b7bdf2",,
    //         "email": "email@yandex.ru"
    //     }
    // } 

//     Коды ошибок:
// 400 - некорректно заполнено одно из полей 

    sendAuthorization(authorizationData) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": authorizationData.password, // Здесь нужно забрать пароль пользователя из формы регистрации
                "email": authorizationData.email, // Здесь нужно забрать почту пользователя из формы регистрации
              })
        })
            .then(response => this._checkResponse(response));
    }


    // Пример ответа при отправке данных авторизации
    // {
    //     "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxNDhlNWJiODhmZGNhOTIxYjZhYzciLCJpYXQiOjE1OTkyMTExNzN9.Q3DVLh7t0f0BjyG9gh3UlUREYQxl2chdGTGy701lF6I"
    // } 

//     Коды ошибок:
// 400 - не передано одно из полей 
// 401 - пользователь с email не найден 

    getUserData(jwt) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                Accept: "application/json", 
                "Content-Type": "application/json", 
                Authorization: `Bearer ${jwt}`
            },
        })
            .then(response => this._checkResponse(response));
    }


// Параметры запроса для проверки валидности токена и получения email для вставки в шапку сайта:
// Пример успешного ответа:
// {
//     "_id":"1f525cf06e02630312f3fed7",
//     "email":"email@email.ru"
// } 
// Коды ошибок:
// # Если токен не передан или передан без Bearer
// 400 — Токен не передан или передан не в том формате

// # Если передан некорректный токен
// 401 — Переданный токен некорректен 




    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}`);
        };
    };

}

const auth = new Auth({
    baseUrl: "https://auth.nomoreparties.co",
    headers: {
      'Content-Type': 'application/json'
    }
}
);

export default auth;