export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._getResponse);
  }

  //получаем ответ по нашему профилю
  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers

    }).then(this._getResponse);
  }

  //обновляем данные о профиле
  setProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._getResponse);
  }

  //отправляем данные о новой карточке
  createCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._getResponse);
  }

  //удаляем карточку
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
      })
    });
  }

  //обновляем статус лайка
  changeLikeCardStatus(cardId, like) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        id: cardId
      })
    }).then(this._getResponse);
  }

  //обновляем данные об аватаре
  setAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })
    }).then(this._getResponse);
  }
}
