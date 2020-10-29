//export const BASE_URL = 'http://localhost:3001';
export const BASE_URL = 'https://api.site.students.nomoreparties.space';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({ password, email })
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Что-то пошло не так');
      }
      return res.json();
    })
    .then((res) => {
      return res;
    })
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
     // authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ password, email })
  })
    .then((res => {
      if (res.status === 400) {
        throw new Error('400 - не передано одно из полей');
      }
      if (res.status === 401) {
        throw new Error('401 - Данные переданы с ошибкой или не полностью');
      }
      return res.json();
    })
    )
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        return;
      }
    })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => res.json())
   // .then(data => data)
}