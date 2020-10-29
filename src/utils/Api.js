//export const BASE_URL = 'http://localhost:3001';
export const BASE_URL = 'https://api.site.students.nomoreparties.space';

export const getInitialCards = (token) => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    })
}

export const setProfile = (name, about, token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, about })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    })
}

export const setAvatar = (avatar, token) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ avatar })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    })
}

export const createCard = (name, link, token) => {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, link, })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    })
}

export const deleteCard = (cardId, token) => {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    })
}

export const changeLikeCardStatus = (cardId, like, token) => {
  return fetch(`${BASE_URL}/cards/${cardId}/likes`, {
    method: like ? 'PUT' : 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      id: cardId
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return Promise.reject(res)
      }
    })
}