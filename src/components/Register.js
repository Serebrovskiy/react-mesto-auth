import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import * as auth from '../utils/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

    const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    auth.register(password, email)
      .then((res) => {
        if (res.statusCode !== 400) {
          resetForm();
          history.push('/sign-in');
        }
        else {
          resetForm();
        }
      });
  };

  return (
    <form className="login" onSubmit={handleSubmit} >
      <h2 className="login__title">Регистрация</h2>
      <input
        className="login__input"
        type="text"
        id="email"
        name="email"
        placeholder="Email"
        minLength="3"
        maxLength="30"
        required
        value={email}
        onChange={evt => setEmail(evt.target.value)}
      />
      <input
        className="login__input"
        type="password"
        id="password"
        name="password"
        placeholder="Пароль"
        minLength="3"
        maxLength="30"
        required
        value={password}
        onChange={evt => setPassword(evt.target.value)}
      />
      <button className="login__button" type="submit">Регистрация</button>
      <p className="login__text">Уже зарегистрированы?
        <Link className="login__text-link" to="/sign-in"> Войти</Link>
      </p>
    </form>
  );
}

export default Register;