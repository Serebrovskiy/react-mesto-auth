import React from 'react';
import logo from '../images/logo.svg';
import { Route, Switch, Link, useHistory, useLocation } from 'react-router-dom';
import * as auth from '../utils/auth';

function Header() {

  const [email, setEmail] = React.useState('');
  const [sign, setSign] = React.useState('Войти');
  const [login, setLogin] = React.useState(false);
  const [loginLink, setLoginLink] = React.useState('/sign-in');
  let location = useLocation();

  const history = useHistory();

  const onSignOut = () => {
    localStorage.removeItem('token');
    setEmail('');
    history.push('/sign-in');
  }

  const onLogin = () => {
    let jwt = localStorage.getItem('token');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.email);
          }
        })
        .catch(err => console.log(err));
    }
  }

  React.useEffect(() => {
    onLogin();
  }, [login]);

  React.useEffect(() => {
    if (location.pathname === '/sign-in') {
      setSign("Регистрация");
      setLogin(false);
      setLoginLink('/sign-up');
    }
    if (location.pathname === '/sign-up') {
      setSign("Войти");
      setLogin(false);
      setLoginLink('/sign-in');
    }

    if (location.pathname === '/') {
      setLogin(true);
      setLoginLink('/sign-in');
    }
  }, [location.pathname]);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип" />
      <Switch>
        <Route>
          <div className="header__container">
            <p className="header__email">{email}</p>
            {login ? <p onClick={onSignOut} className="header__out">Выйти</p> : <Link to={loginLink} className="header__out">{sign}</Link>}
          </div>
        </Route>
      </Switch>

    </header>
  );
}

export default Header;