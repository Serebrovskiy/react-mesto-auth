import React, { useCallback } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithImage from './PopupWithImage';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import * as api from '../utils/Api';
import { CurrentUserContext } from './contexts/CurrentUserContext';


function App() {
  const [isEditAvatarPopupOpen, setIsOpenPopupAvatar] = React.useState(false);
  const [isAddPlacePopupOpen, setIsOpenPopupPlace] = React.useState(false);
  const [isEditProfilePopupOpen, setIsOpenPopupProfile] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isInfoTooltipPopupOpen, setIsOpenPopupInfoTooltip] = React.useState(false);
  const [messageInfoTooltip, setMessageInfoTooltip] = React.useState('Ой, ошибка');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    tokenCheck();
    onLogin();
  }, []);

  const onLogin = useCallback(() => {
    if (localStorage.token) {
      Promise.all([auth.getContent(localStorage.token), api.getInitialCards(localStorage.token)])
        .then(res => {
          setCurrentUser(res[0]);
          setCards(res[1].map(item => ({
            _id: item._id,
            likes: item.likes,
            name: item.name,
            link: item.link,
            owner: item.owner
          })));
        })
        .catch((err) => console.error(err));
    }
  }, [history]);

  function handleInfoTooltipClick(login) {
    login ? setLoggedIn(true) : setLoggedIn(false);
  //  onLogin();
    setIsOpenPopupInfoTooltip(true);
  }

  function handleEditAvatarClick() {
    setIsOpenPopupAvatar(true);
  }

  function handleEditPlaceClick() {
    setIsOpenPopupPlace(true);
  }

  function handleEditProfileClick() {
    setIsOpenPopupProfile(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(value) {
    api.setProfile(value.name, value.about, localStorage.token)
      .then(res => {

        setCurrentUser(res);
        closeAllPopups();
        onLogin();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar(link) {
    api.setAvatar(link.avatar, localStorage.token)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api.createCard(newCard.name, newCard.link, localStorage.token)
      .then(res => {
        newCard = {
          _id: res._id,
          likes: res.likes,
          name: res.name,
          link: res.link,
          owner: res.owner
        }
        setCards([...cards, newCard]);
        closeAllPopups();
      }).catch((err) => console.error(err));
  }

  function closeAllPopups() {
    setIsOpenPopupAvatar(false);
    setIsOpenPopupPlace(false);
    setIsOpenPopupProfile(false);
    setSelectedCard(null);
    setIsOpenPopupInfoTooltip(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, localStorage.token).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch((err) => console.error(err));

  }
  function handleCardDelete(card) {
    api.deleteCard(card._id, localStorage.token).then((newCard) => {
      const newCards = cards.filter((c) => c._id === card._id ? null : newCard);
      setCards(newCards);
    })
      .catch((err) => console.error(err));
  }

  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then((res) => {
        if (res.statusCode !== 400) {
          history.push('/sign-in');
          handleInfoTooltipClick(true);
        }
      })
      .catch((err) => {
        console.error(err);
        handleInfoTooltipClick(false);
        setMessageInfoTooltip(err.message);
      });
  }

  const handleLogin = (password, email) => {
    return auth
      .authorize(password, email)
      .then((data) => {
        if (!data) {
          throw new Error('Что-то пошло не так!');
        }
        if (data.token) {
          setLoggedIn(true);
          localStorage.setItem('token', data.token)
          tokenCheck();
          handleInfoTooltipClick();
          onLogin();
        }
      })
      .then(() => {
        history.push('/')
        onLogin();
      })
      .catch((err) => {
        handleInfoTooltipClick(false);
        setMessageInfoTooltip(err.message);
      });
  }

  const tokenCheck = () => {
    if (localStorage.token) {
      auth.getContent(localStorage.token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push('/');
          } else {
            localStorage.removeItem('token')
            setLoggedIn(false)
            setCurrentUser({})
          }
        })
        .catch(err => console.error(err));
    }
  }

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") closeAllPopups();
    }
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  React.useEffect(() => {
    const handleMouseClose = (evt) => {
      if (evt.target.classList.contains("popup_opened")) closeAllPopups();
    }
    document.addEventListener("click", handleMouseClose);
    return () => document.removeEventListener("click", handleMouseClose);
  }, []);


  return (
    <div>
      <main className="page">

        <CurrentUserContext.Provider value={currentUser}>
          <Header />

          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onAddCard={handleEditPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onCardList={cards}
              component={Main}
            />
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <PopupWithImage
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            loggedIn={loggedIn}
            messageError={messageInfoTooltip}
          />
        </CurrentUserContext.Provider>
      </main>
    </div>
  );
}

export default App;
