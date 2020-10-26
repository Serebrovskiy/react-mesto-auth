import React from 'react';
import Card from './Card';
import { avatarLoad } from '../utils/utils';
import { CurrentUserContext } from './contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddCard, onCardClick, onCardLike, onCardDelete, onCardList }) {

  const currentUser = React.useContext(CurrentUserContext);  // получаем значение контекста

  return (
    <>
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : avatarLoad} alt="Аватар" />
        </div>
        <div className="profile__name-block">
          <h2 className="profile__name">{currentUser.name ? currentUser.name : "Имя"}</h2>
          <button type="button" className="profile__edit" onClick={onEditProfile} />
          <p className="profile__profession">{currentUser.about ? currentUser.about : "Профессия"}</p>
        </div>
        <button type="button" className="profile__button" onClick={onAddCard} />
      </section>
      <section className="cards">
        {
          onCardList.map(elem =>
            <Card
              card={elem}
              key={elem._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />)
        }
      </section>
    </ >
  );
}

export default Main;
