import React from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext';

export function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);   //для отрисовки иконки удаления только у своих карточек и лайков которые уже поставили

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `card__basket ${isOwn ? 'card__basket_visible' : 'card__basket_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ''}`);


	function handleClick() {
		onCardClick(card);
  }

  function handleLikeClick() {
		onCardLike(card);
  }

  function handleDeleteClick() {
		onCardDelete(card);
  }

	return (
		<>
			<div className="card">
				<button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick } />
				<img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
				<div className="card__container">
					<h3 className="card__title">{card.name}</h3>
					<div className="card__container-like">
						<button className={cardLikeButtonClassName} onClick={handleLikeClick} />
						<p className="card__number-likes">{card.likes.length}</p>
					</div>
				</div>
			</div>
		</ >
	);
}

export default Card;