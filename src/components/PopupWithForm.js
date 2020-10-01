import React from 'react';

function PopupWithForm({ name, title, isOpen, onClose, onSubmit, isDisabled, children }) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__grid">
        <button type="button" className="popup__close-icon" onClick={onClose} />
        <form className={`popup__container popup__container_${name}`} name={`form_${name}`} onSubmit={onSubmit} noValidate>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className={`popup__button ${isDisabled && "popup__button_disabled"}`} disabled={isDisabled} type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;