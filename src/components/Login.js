import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = ({ onLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      console.log("какие то данные не заполненны");
      return;
    }
    onLogin(password, email);
    resetForm();
  };

  return (
    <form className="login" onSubmit={handleSubmit}  >
      <h2 className="login__title">Вход</h2>
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
      <button className="login__button" type="submit">Войти</button>
      <p className="login__text">Ещё не зарегистрированы?
        <Link className="login__text-link" to="/sign-up"> Регистрация</Link>
      </p>
    </form>
  );
}

export default Login;