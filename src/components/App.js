import React, { useCallback } from 'react';
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
import { api } from '../utils/utils';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

function App() {
  const [isEditAvatarPopupOpen, setIsOpenPopupAvatar] = React.useState(false);
  const [isAddPlacePopupOpen, setIsOpenPopupPlace] = React.useState(false);
  const [isEditProfilePopupOpen, setIsOpenPopupProfile] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState('');
  const [isInfoTooltipPopupOpen, setIsOpenPopupInfoTooltip] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  function handleInfoTooltipClick(login) {
    login ? setLoggedIn(true) : setLoggedIn(false);
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
    api.setProfile(value.name, value.about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err) => console.error(err));
  }

  function handleUpdateAvatar(link) {
    api.setAvatar(link.avatar)
      .then(res => {
        setIsOpenPopupAvatar(res);
        setCurrentUser(res);
        closeAllPopups();
      }).catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api.createCard(newCard.name, newCard.link)
      .then(res => {
        setIsOpenPopupPlace(res);
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
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
      .catch((err) => console.error(err));

  }
  function handleCardDelete(card) {
    api.deleteCard(card._id).then((newCard) => {
      const newCards = cards.filter((c) => c._id === card._id ? null : newCard);
      setCards(newCards);
    })
      .catch((err) => console.error(err));
  }

  const onAuth = (password, email) => {
    return auth
      .authorize(password, email)
      .then((data) => {
        if (!data) {
          throw new Error('Что-то пошло не так!');
        }
        if (data.token) {
          setLoggedIn(true);
        }
      });
  }

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") closeAllPopups();
    }
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  });

  React.useEffect(() => {
    const handleMouseClose = (evt) => {
      if (evt.target.classList.contains("popup_opened")) closeAllPopups();
    }
    document.addEventListener("click", handleMouseClose);
    return () => document.removeEventListener("click", handleMouseClose);
  });

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
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
  }, []);

  const tokenCheck = useCallback(() => {
    let jwt = localStorage.getItem('token');

    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push('/main');
          }
          else {
            setLoggedIn(false);
          }
        })
        .catch(err => console.error(err));
    }
  }, [history]);


  return (
    <div>
      <main className="page">

        <CurrentUserContext.Provider value={currentUser}>
          <Header />

          <Switch>
            <ProtectedRoute
              path="/main"
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
              <Register />
            </Route>
            <Route path="/sign-in">
              <Login onAuth={onAuth} tokenCheck={tokenCheck} onSubmit={handleInfoTooltipClick} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
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
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
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
          />
        </CurrentUserContext.Provider>
      </main>
    </div>
  );
}

export default App;
