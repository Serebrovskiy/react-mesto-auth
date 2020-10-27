import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Login = ({ onLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = React.useState(true);
  const inputEmailRef = React.useRef("");
  const inputPasswordRef = React.useRef("");


  function handleCheckValidity() {
    inputEmailRef.current.checkValidity() && inputPasswordRef.current.checkValidity()
      ?
      setIsDisabled(false) : setIsDisabled(true);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
    handleCheckValidity();
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
    handleCheckValidity();
  }

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

  React.useEffect(() => {
    handleCheckValidity()
  }, []);

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
        onChange={handleChangeEmail}
        ref={inputEmailRef}
        required
        value={email}
        // onChange={evt => setEmail(evt.target.value)}
      />
      <input
        className="login__input"
        type="password"
        id="password"
        name="password"
        placeholder="Пароль"
        minLength="3"
        maxLength="30"
        onChange={handleChangePassword}
        ref={inputPasswordRef}
        required
        value={password}
        //onChange={evt => setPassword(evt.target.value)}
      />
      <button className= {`login__button ${isDisabled && "login__button_disabled"}`} type="submit" disabled={isDisabled}>Войти</button>
      <p className="login__text">Ещё не зарегистрированы?
        <Link className="login__text-link" to="/sign-up"> Регистрация</Link>
      </p>
    </form>
  );
}

export default Login;